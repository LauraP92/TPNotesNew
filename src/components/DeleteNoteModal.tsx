import { StyleSheet, Modal, View } from 'react-native'
import React, { Dispatch, FC, SetStateAction } from 'react'
import TemplateText from './TemplateText'
import ModalButtons from './ModalButtons'
import { BLACK, WHITE } from '../constants/COLORS'
import { NoteType } from '../types/NoteTypes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface Props {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    notes: NoteType[],
    setNotes: Dispatch<SetStateAction<NoteType[]>>,
    id: number,
    navigation: NativeStackNavigationProp<any>,
}

const DeleteNoteModal: FC<Props> = ({ navigation, modalVisible, setModalVisible, notes, setNotes, id }) => {

    const storeData = async (key: string, value: NoteType[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
        }
    };


    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TemplateText style={styles.modalTitle}>Delete this note?</TemplateText>
                    <View>
                        <ModalButtons
                            text={'Delete'}
                            onPress={async () => {
                                const newNotes = notes.filter((item) => {
                                    return item?.id !== id
                                })
                                await storeData('notes', newNotes)
                                navigation.goBack()
                            }} />

                        <ModalButtons
                            text={'Cancel'}
                            onPress={() => {
                                setModalVisible(false)
                            }} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DeleteNoteModal

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: `${BLACK}9A`
    },
    contentContainer: {
        padding: 15,
        borderRadius: 20,
        backgroundColor: WHITE,
    },
    modalTitle: {
        alignSelf: 'center',
        fontSize: 18,
    }
})