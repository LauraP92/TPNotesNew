import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import TemplateIcon from './TemplateIcon'
import { BLUE } from '../constants/COLORS'
import { SPACE_MEDIUM, SPACE_XLARGE } from '../constants/LAYOUT'

interface Props {
    onPress: () => void,
    onClose: () => void,
}

const SelectAllButton: FC<Props> = ({ onPress, onClose }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.close}
                onPress={onClose} >
                <TemplateIcon name='close' family='AntDesign' size={30} color={BLUE} />
            </Pressable>
            <Pressable style={styles.select} onPress={onPress}>
                <TemplateIcon name='multi-select' family='Octicons' size={30} color={BLUE} />
            </Pressable >
        </View>
    )
}

export default SelectAllButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        justifyContent: 'space-between',
    },
    close: {
        marginLeft: SPACE_MEDIUM,
    },
    select: {
        marginRight: SPACE_XLARGE,
    },
})