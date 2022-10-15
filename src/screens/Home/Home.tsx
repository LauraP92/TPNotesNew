import { StyleSheet, View, TextInput } from 'react-native'
import React, { FC, useState, useEffect, useRef } from 'react'
import { BORDER_SMALL, FONT_LARGE, FONT_XLARGE, SPACE_MEDIUM } from '../../constants/LAYOUT'
import { BLUE } from '../../constants/COLORS'
import TemplateIcon from '../../components/TemplateIcon'
import { ScrollView } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NoteCard from '../../components/NoteCard'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TemplateText from '../../components/TemplateText'
import AddNoteButton from '../../components/AddNoteButton'
import { NoteType } from '../../types/NoteTypes'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TEXTURES } from '../../constants/TEXTURES'
import CancelButton from '../../components/CancelButton'
import DeleteCardButton from '../../components/DeleteCardButton'
import SelectAllButton from '../../components/SelectAllButton'
import DeleteNoteModal from '../../components/DeleteNoteModal'


interface Props {
    navigation: NativeStackNavigationProp<any>,
}

const Home: FC<Props> = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [notes, setNotes] = useState<NoteType[]>([])
    const isFocused = useIsFocused()
    const [selectedCardIds, setSelectedCardIds] = useState<number[]>([])
    const searchRef = useRef()
    const [isActive, setIsActive] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [isPressed, setIsPressed] = useState(false)

    const selectCard = (id: number) => {
        if (selectedCardIds.indexOf(id) !== -1) {
            const filteredCardIds = selectedCardIds.filter((item) => {
                return id !== item
            })
            setSelectedCardIds(filteredCardIds)
        } else {
            setSelectedCardIds([...selectedCardIds, id])
        }
    }


    const deleteCards = () => {
        const newNotes = notes.filter((item) => {
            return selectedCardIds.indexOf(item.id) === -1
        })
        setNotes(newNotes)
        storeData('notes', newNotes)
    }

    const filteredNotes = notes.filter(card => {
        return (
            card?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || card?.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            return parsedValue;
        } catch (e) {
            // error reading value
        }
    };

    const storeData = async (key: string, value: NoteType[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
        }
    };

    useEffect(() => {
        if (isFocused) {
            (async () => {
                const storedNotes = await getData('notes')
                if (storedNotes) {
                    setNotes(storedNotes)
                }
            })()
        }
    }, [isFocused])


    return (
        <View style={styles.container}>
            {!!isActive && <SelectAllButton onPress={() => {
                if (selectedCardIds?.length !== notes?.length) {
                    const allCardsSelected = notes.map((card) => { return card.id })
                    setSelectedCardIds(allCardsSelected)
                } else {
                    setSelectedCardIds([])
                }
            }}
                onClose={() => {
                    setSelectedCardIds([])
                    setIsActive(false)
                }}></SelectAllButton>}
            <View style={styles.searchContainer}>
                <View style={[styles.searchInput, { width: !!isPressed ? 290 : 350 }]}>
                    <TextInput
                        ref={searchRef}
                        style={styles.search}
                        placeholder={'Search notes'}
                        placeholderTextColor={`${BLUE}80`}
                        maxLength={22}
                        onPressIn={() => {
                            setIsPressed(true)
                        }}
                        // onPressOut={() => {
                        //     setIsPressed(false)
                        // }}
                        onChangeText={text => {
                            setSearchTerm(text);
                        }}
                        value={searchTerm}
                    />
                    <TemplateIcon
                        style={styles.icon}
                        name={searchTerm ? "close-outline" : "search"}
                        size={20}
                        color={BLUE}
                        family={'Ionicons'}
                        onPress={() => {
                            setSearchTerm('');
                        }}
                    />
                </View>
                {!!isPressed ? (<CancelButton onPress={() => {
                    if (searchTerm) {
                        searchRef.current.blur()
                        setSearchTerm('')
                    } else if (searchTerm === '') {
                        searchRef.current.blur()
                    }
                    setIsPressed(false)
                }} />) : null}
            </View>
            <ScrollView style={styles.scrollViewContainer}>
                {filteredNotes.length === 0 && searchTerm ? <View style={styles.noResultContainer}>
                    <TemplateText style={styles.noResult}>Ooops, nothing found with this {"\n"} description...</TemplateText>
                </View> : filteredNotes.map((note) => {
                    return (
                        <NoteCard
                            isSelected={selectedCardIds.indexOf(note.id) !== -1}
                            selectionStarted={selectedCardIds.length !== 0 || isActive}
                            id={note.id}
                            title={note.title}
                            description={note.description}
                            backgroundColor={note.noteDesign.backgroundColor}
                            textColor={note.noteDesign.textColor}
                            // fontSize={note.fontSize.name}
                            key={note.id}
                            navigation={navigation}
                            imageSource={!!note?.noteTextureId && TEXTURES[note?.noteTextureId]?.image}
                            onLongPress={() => {
                                selectCard(note.id)
                                setIsActive(true)
                            }}
                            onPress={() => {
                                if (selectedCardIds.length !== 0 || isActive) {
                                    selectCard(note.id)
                                }
                                else {
                                    navigation.navigate('NoteDetails', {
                                        id: note.id,
                                    })

                                }
                            }}
                        />
                    )
                })
                }
            </ScrollView>
            {!!isActive ? <DeleteCardButton onPress={() => {
                setModalVisible(true)
            }} /> : <AddNoteButton navigation={navigation} />}

            <DeleteNoteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onDelete={() => {
                    deleteCards()
                    setSelectedCardIds([])
                    setIsActive(false)
                    setModalVisible(false)
                }}
            />
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: BORDER_SMALL,
        borderColor: BLUE,
        justifyContent: 'space-between',
        borderRadius: 23,
        margin: SPACE_MEDIUM,
        height: 50,
    },
    search: {
        fontSize: FONT_XLARGE,
        color: BLUE,
        marginLeft: SPACE_MEDIUM,
        flex: 1,
    },
    icon: {
        marginRight: SPACE_MEDIUM,
    },
    iconCheck: {
        position: 'absolute',
    },
    scrollViewContainer: {
        flex: 1,
        marginBottom: 80,
    },
    noResultContainer: {
        flex: 1,
    },
    noResult: {
        color: BLUE,
        fontSize: FONT_LARGE,
        textAlign: 'center',
    },
})