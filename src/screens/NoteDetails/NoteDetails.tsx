import { ColorValue, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core';
import { TextInput } from 'react-native-gesture-handler';
import { BLUE, PINK } from '../../constants/COLORS';
import { FONT_XLARGE, SPACE_LARGE } from '../../constants/LAYOUT';
import { NoteType } from '../../types/NoteTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findIndex } from 'lodash';

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
}

const NoteDetails: FC<Props> = ({ route }) => {
    const id = route?.params?.id;
    const isFocused = useIsFocused()
    // const isFocused = navigation.isFocused()

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteType>({
        id: Date.now(),
        title: '',
        description: '',
        color: PINK,
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

    const saveOnLeaveScreen = () => {
        const notesList = [...notes]
        if (id) {
            const notesIndex = findIndex(notesList, (item) => { return id === item.id })
            notesList.splice(notesIndex, 1, currentNote)
            storeData('notes', notesList)
        } else if (!id) {
            storeData('notes', [...notes, currentNote])
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
    }, [currentNote, notes])


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


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.title}
                    // value={title}
                    placeholder={'Title (optional)'}
                    placeholderTextColor={`${BLUE}80`}
                    onChangeText={text => {
                        setCurrentNote({
                            ...currentNote,
                            title: text,
                        })
                    }}
                    value={currentNote.title}
                />
                <TextInput
                    style={styles.text}
                    // value={description}
                    placeholder={'Type details here'}
                    placeholderTextColor={`${BLUE}80`}
                    multiline={true}
                    onChangeText={text => {
                        setCurrentNote({
                            ...currentNote,
                            description: text,
                        })
                    }}
                    value={currentNote.description}

                />
            </View>
        </View >
    )
}

export default NoteDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACE_LARGE,
    },
    inputContainer: {
        flex: 1,
    },
    title: {
        fontSize: FONT_XLARGE,
        color: BLUE,
    },
    text: {
        flex: 1,
        fontSize: FONT_XLARGE,
        color: BLUE,
    },

})