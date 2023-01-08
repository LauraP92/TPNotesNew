import { ColorValue, StyleSheet, View, ScrollView, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../constants/COLORS';
import { FONT_MEDIUM, FONT_XLARGE, FONT_XSMALL, SCREEN_HEIGHT, SCREEN_WIDTH, SPACE_MEDIUM, SPACE_SMALL } from '../../constants/LAYOUT';
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
import FontSizeButton from '../../components/FontSizeButton';

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
    const [isActive, setIsActive] = useState(false)
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteType>({
        id: Date.now(),
        title: '',
        description: '',
        noteDesign: {
            backgroundColor: undefined,
            textColor: 'black',
        },
        noteTextureId: 0,
        fontSize: {
            name: 'Mediun',
            size: FONT_MEDIUM,
        },
    })
    const [modalVisible, setModalVisible] = useState(false)
    const [showColors, setShowColors] = useState(false)
    const [showFontSize, setShowFontSize] = useState(false)

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
        if (!modalVisible && (!!currentNote?.title || !!currentNote?.description)) {
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
    }, [currentNote, notes, modalVisible, currentNote?.title])

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
            headerTintColor: currentNote.noteDesign.textColor,
            headerTransparent: true,
            headerRight: () => {
                return (
                    <DeleteNoteButton
                        color={currentNote.noteDesign.textColor}
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
            id: 0,
            backgroundColor: undefined,
            textColor: 'black',
        },
        {
            id: 1,
            backgroundColor: WHITE,
            textColor: 'black',
        },
        {
            id: 2,
            backgroundColor: '#C5EBFE',
            textColor: 'blue',
        },
        {
            id: 3,
            backgroundColor: '#FEC9A7',
            textColor: 'brown',
        },
        {
            id: 4,
            backgroundColor: '#A5F8CE',
            textColor: 'green',
        },
        {
            id: 5,
            backgroundColor: '#FEFD97',
            textColor: 'orange',
        },
        {
            id: 6,
            backgroundColor: '#F197C0',
            textColor: 'red',
        },
        {
            id: 7,
            backgroundColor: '#B49FDC',
            textColor: 'purple',
        }
    ]

    const fontSize = [{
        name: 'Small',
        size: FONT_XSMALL,
    },
    {
        name: 'Medium',
        size: FONT_MEDIUM,
    },
    {
        name: 'Large',
        size: FONT_XLARGE,
    },
    ]

    const Icons = [
        {
            name: 'format-color-fill',
            family: 'MaterialCommunityIcons',
            size: 40,
            color: currentNote.noteDesign.textColor,
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
                setIsActive(true)
            },
        },
        {
            name: 'font',
            family: 'Fontisto',
            size: 25,
            color: currentNote.noteDesign.textColor,
            onPress: () => {
                setShowFontSize(!showFontSize);
                setIsActive(true)
            },
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
                    <ScrollView contentContainerStyle={styles.containerContentInput} style={styles.scrollViewInput} >
                        <TextInput
                            style={[styles.title, { color: currentNote?.noteDesign?.textColor, fontSize: currentNote?.fontSize?.size }]}
                            placeholder={'Title (optional)'}
                            placeholderTextColor={`${currentNote?.noteDesign?.textColor}80`}
                            multiline={true}
                            onChangeText={text => {
                                setCurrentNote({
                                    ...currentNote,
                                    title: text,
                                })
                            }}
                            value={currentNote.title}
                        />
                        <TextInput
                            style={[styles.text, { color: currentNote?.noteDesign?.textColor, fontSize: currentNote?.fontSize?.size }]}
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
                    </ScrollView>
                    {showColors === false ? null :
                        (<View>
                            <ScrollView
                                contentContainerStyle={styles.scrollviewContainer}
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={90}
                                decelerationRate={'fast'}
                                disableIntervalMomentum={true}
                                scrollEventThrottle={16}
                                horizontal>
                                {TEXTURES.map((item) => {
                                    return (
                                        <TexturePickerButton
                                            key={item.id}
                                            imageSource={item.image}
                                            color={currentNote.noteDesign.textColor}
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
                                snapToInterval={SCREEN_WIDTH}
                                decelerationRate={'fast'}
                                disableIntervalMomentum={true}
                                scrollEventThrottle={16}
                                horizontal>
                                {colorsArray.map((item) => {
                                    return (
                                        <ColorPickerButton
                                            key={item.id}
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
                    {showFontSize === false ? null :
                        (<View>
                            <ScrollView
                                contentContainerStyle={styles.scrollviewContainer}
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={90}
                                decelerationRate={'fast'}
                                disableIntervalMomentum={true}
                                scrollEventThrottle={16}
                                horizontal>
                                {fontSize.map((item) => {
                                    return (
                                        <FontSizeButton
                                            key={item.name}
                                            size={item.size}
                                            name={item.name}
                                            color={currentNote.noteDesign.textColor}
                                            selected={currentNote?.fontSize?.size === item.size}
                                            onPress={() => {
                                                setCurrentNote({
                                                    ...currentNote,
                                                    fontSize: item,
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
                        onDelete={async () => {
                            const newNotes = notes.filter((item) => {
                                return item?.id !== id
                            })
                            await storeData('notes', newNotes)
                            navigation.goBack()
                        }}
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
    containerContentInput: {
        flexGrow: 1
    },
    scrollViewInput: {
        flex: 1,
    },
    image: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: 'absolute',
    },
    title: {
        padding: SPACE_MEDIUM,
        fontWeight: 'bold',
    },
    text: {
        padding: SPACE_MEDIUM,
        flex: 1,
        textAlignVertical: 'top',
    },
    scrollviewContainer: {
        marginBottom: SPACE_MEDIUM,
        paddingHorizontal: SPACE_SMALL,
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})