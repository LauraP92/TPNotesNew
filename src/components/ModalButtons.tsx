import { Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import TemplateText from './TemplateText'
import { BLUE } from '../constants/COLORS'

interface Props {
    text: string,
    onPress: () => void,
}

const ModalButtons: FC<Props> = ({ text, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress} >
            <TemplateText>{text}</TemplateText>
        </Pressable>
    )
}

export default ModalButtons

const styles = StyleSheet.create({
    button: {
        height: 46,
        borderRadius: 10,
        backgroundColor: BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
})