import { ColorValue, StyleSheet, View, ScrollView, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { TextInput } from 'react-native-gesture-handler';
import { BEIGE, BLACK, GREEN, GREY, KAKI, PINK, PURPLE, WHITE } from '../../constants/COLORS';
import { FONT_XLARGE, SCREEN_HEIGHT, SCREEN_WIDTH, SPACE_MEDIUM } from '../../constants/LAYOUT';
import { NoteType } from '../../types/NoteTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findIndex } from 'lodash';
import DeleteNoteButton from '../../components/DeleteNoteButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeleteNoteModal from '../../components/DeleteNoteModal';
import IconButton from '../../components/IconButton';
import ColorPickerButton from '../../components/ColorPickerButton';
import { TEXTURES } from '../../constants/TEXTURES';
import TexturePickerButton from '../../components/TexturePickerButton';

interface Props {
    route: RouteProp<{
        params: {
            id: number,
            title: string | undefined,
            description: string | undefined,
            color: ColorValue,
            notes: NoteType[],
        }
    }, 'params'>
    navigation: NativeStackNavigationProp<any>
}

const NoteDetails: FC<Props> = ({ route, navigation }) => {
    const headerHeight = useHeaderHeight();
    const id = route?.params?.id;
    const isFocused = useIsFocused()
    // const isFocused = navigation.isFocused()

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteType>({
        id: Date.now(),
        title: '',
        description: '',
        noteDesign: {
            backgroundColor: '',
            textColor: '',
        },
        noteTextureId: 0,
    })
    const [modalVisible, setModalVisible] = useState(false)
    const [showColors, setShowColors] = useState(false)


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

    const saveOnLeaveScreen = () => {
        const notesList = [...notes]
        if (!modalVisible) {
            if (id) {
                const notesIndex = findIndex(notesList, (item) => { return id === item.id })
                notesList.splice(notesIndex, 1, currentNote)
                storeData('notes', notesList)
            } else if (!id) {
                storeData('notes', [...notes, currentNote])
            }
        }
    }

    useEffect(() => {
        (async () => {
            const storedNotes = await getData('notes')
            if (storedNotes) {
                setNotes(storedNotes);
            }
        })()
    }, [])

    useEffect(() => {
        return saveOnLeaveScreen
    }, [currentNote, notes, modalVisible])


    useEffect(() => {
        if (id && notes?.length) {
            const editedNote = notes.find((note) => {
                return (
                    note.id === id
                )
            })
            if (editedNote) {
                setCurrentNote(editedNote)
            }
        }
    }, [notes])

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
            },
            headerTransparent: true,
            headerRight: () => {
                return (
                    <DeleteNoteButton
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    />
                );
            },
        });
    }, [currentNote]);

    const colorsArray = [
        {
            backgroundColor: PINK,
            textColor: WHITE,
        },
        {
            backgroundColor: BEIGE,
            textColor: BLACK,
        },
        {
            backgroundColor: KAKI,
            textColor: BLACK,
        },
        {
            backgroundColor: GREEN,
            textColor: BLACK,
        },
        {
            backgroundColor: GREY,
            textColor: WHITE,
        },
        {
            backgroundColor: PURPLE,
            textColor: WHITE,
        }
    ]

    const Icons = [
        {
            name: 'format-color-fill',
            family: 'MaterialCommunityIcons',
            size: 40,
            onPress: () => {
                // if (showColors === false) {
                //     setShowColors(true);
                // }
                // if (showColors === true) {
                //     setShowColors(false);
                // }
                // showColors === false ? setShowColors(true) : setShowColors(false);
                // setShowColors(showColors === false ? true : false);
                setShowColors(!showColors);
            },
        },
        {
            name: 'bold',
            family: 'FontAwesome5',
            size: 30,
            onPress: () => { },
        },
        {
            name: 'italic',
            family: 'Feather',
            size: 30,
            onPress: () => { },
        },
        {
            name: 'format-underline',
            family: 'MaterialCommunityIcons',
            size: 35,
            onPress: () => { },
        },
        {
            name: 'check-square',
            family: 'Feather',
            size: 35,
            onPress: () => { },
        },
    ];

    return (
        <View style={styles.contentContainer}>
            {currentNote.noteTextureId === null ? null : (
                <Image
                    style={styles.image}
                    source={TEXTURES[currentNote?.noteTextureId].image}></Image>
            )}
            <View style={[styles.colorOverlay, { backgroundColor: currentNote.noteDesign.backgroundColor }]} />
            <View style={[styles.container, { paddingTop: headerHeight }]}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.title, { color: currentNote.noteDesign.textColor }]}
                        placeholder={'Title (optional)'}
                        placeholderTextColor={`${currentNote?.noteDesign?.textColor}80`}
                        onChangeText={text => {
                            setCurrentNote({
                                ...currentNote,
                                title: text,
                            })
                        }}
                        value={currentNote.title}
                    />
                    <TextInput
                        style={[styles.text, { color: currentNote.noteDesign.textColor }]}
                        placeholder={'Type details here'}
                        placeholderTextColor={`${currentNote?.noteDesign?.textColor}80`}
                        multiline={true}
                        onChangeText={text => {
                            setCurrentNote({
                                ...currentNote,
                                description: text,
                            })
                        }}
                        value={currentNote.description}
                    />
                    {showColors === false ? null : (
                        <View>
                            <ScrollView
                                contentContainerStyle={styles.contentContainer}
                                showsHorizontalScrollIndicator={false}
                                horizontal>
                                {TEXTURES.map((item) => {
                                    return (
                                        <TexturePickerButton
                                            key={item.id}
                                            imageSource={item.image}
                                            selected={currentNote?.noteTextureId === item.id}
                                            onPress={() => {
                                                setCurrentNote({
                                                    ...currentNote,
                                                    noteTextureId: item.id,
                                                });
                                            }}
                                        />
                                    )
                                })}
                            </ScrollView>
                            <ScrollView
                                contentContainerStyle={styles.scrollviewContainer}
                                showsHorizontalScrollIndicator={false}
                                horizontal>
                                {colorsArray.map((item) => {
                                    return (
                                        <ColorPickerButton
                                            key={item.backgroundColor}
                                            color={item.backgroundColor}
                                            selected={currentNote?.noteDesign?.backgroundColor === item.backgroundColor}
                                            onPress={() => {
                                                setCurrentNote({
                                                    ...currentNote,
                                                    noteDesign: item,
                                                });
                                            }}
                                        />
                                    )
                                })}
                            </ScrollView>

                        </View>


                    )}
                    <View style={styles.icons}>
                        {Icons.map((icon) => {
                            return (
                                <IconButton
                                    name={icon.name}
                                    family={icon.family}
                                    color={icon.color}
                                    size={icon.size}
                                    key={icon.name}
                                    onPress={icon.onPress}
                                />
                            )
                        })}
                    </View>
                    <DeleteNoteModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        notes={notes}
                        setNotes={setNotes}
                        id={id}
                        navigation={navigation}
                    />
                </View>
            </View >
        </View>

    )
}

export default NoteDetails

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    colorOverlay: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        opacity: 0.5,
        position: 'absolute',
    },
    container: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
    },
    image: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: 'absolute',
    },
    title: {
        fontSize: FONT_XLARGE,
        padding: SPACE_MEDIUM,
    },
    text: {
        flex: 1,
        fontSize: FONT_XLARGE,
        padding: SPACE_MEDIUM,
    },
    scrollviewContainer: {
        marginBottom: SPACE_MEDIUM,
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})