import { StyleSheet, Modal, View } from 'react-native'
import React, { Dispatch, FC, SetStateAction } from 'react'
import TemplateText from './TemplateText'
import ModalButtons from './ModalButtons'
import { BLACK, WHITE } from '../constants/COLORS'

interface Props {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    onDelete: () => void,
}

const DeleteNoteModal: FC<Props> = ({ modalVisible, setModalVisible, onDelete }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TemplateText style={styles.modalTitle}>Delete this note?</TemplateText>
                    <View>
                        <ModalButtons
                            text={'Delete'}
                            onPress={onDelete}
                        />


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