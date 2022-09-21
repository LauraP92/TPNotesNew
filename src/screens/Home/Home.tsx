import { StyleSheet, View } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { BORDER_SMALL, FONT_LARGE, FONT_XLARGE, SPACE_LARGE, SPACE_MEDIUM } from '../../constants/LAYOUT'
import { BLUE } from '../../constants/COLORS'
import TemplateIcon from '../../components/TemplateIcon'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NoteCard from '../../components/NoteCard'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TemplateText from '../../components/TemplateText'
import AddNoteButton from '../../components/AddNoteButton'
import { NoteType } from '../../types/NoteTypes'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props {
    navigation: NativeStackNavigationProp<any>
}

const Home: FC<Props> = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [notes, setNotes] = useState<NoteType[]>([])
    const isFocused = useIsFocused()

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


    // const notes = [{
    //     id: 1,
    //     title: 'First note',
    //     description: "hbhbhbhjv",
    //     color: BLUE,
    // },
    // {
    //     id: 2,
    //     title: "Second Note",
    //     description: "",
    //     color: PINK,
    // },
    // {
    //     id: 3,
    //     title: "Third Note",
    //     description: "",
    //     color: GREEN,
    // }]


    return (
        <View style={styles.container}>
            <View style={styles.searchInput}>
                <TextInput
                    style={styles.search}
                    placeholder={'Search notes'}
                    placeholderTextColor={`${BLUE}80`}
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
            <ScrollView style={styles.scrollViewContainer}>
                {filteredNotes.length === 0 && searchTerm ? <View style={styles.noResultContainer}>
                    <TemplateText style={styles.noResult}>Ooops, nothing found with this {"\n"} description...</TemplateText>
                </View> : filteredNotes.map((note) => {
                    return (
                        <NoteCard
                            id={note.id}
                            title={note.title}
                            description={note.description}
                            color={note.color}
                            key={note.id}
                            navigation={navigation}
                        />
                    )
                })
                }
            </ScrollView>
            <AddNoteButton navigation={navigation}></AddNoteButton>
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: BORDER_SMALL,
        borderColor: BLUE,
        justifyContent: 'space-between',
        borderRadius: 23,
        margin: SPACE_LARGE,
        height: 50,
    },
    search: {
        fontSize: FONT_XLARGE,
        color: BLUE,
        marginLeft: SPACE_MEDIUM,
    },
    icon: {
        marginRight: SPACE_MEDIUM,
    },
    scrollViewContainer: {
        flex: 1,
    },
    noResultContainer: {
        flex: 1,
    },
    noResult: {
        color: BLUE,
        fontSize: FONT_LARGE,
        textAlign: 'center',
    }
})