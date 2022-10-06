import { ColorValue, Image, Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { WHITE } from '../constants/COLORS'
import { BORDER_XSMALL, RADIUS_SMALL, SCREEN_HEIGHT, SCREEN_WIDTH, SPACE_SMALL } from '../constants/LAYOUT'
import TemplateIcon from './TemplateIcon'

interface Props {
    onPress: () => void,
    selected: boolean,
    imageSource: number | { uri: string },
    color: ColorValue,
}

const TexturePickerButton: FC<Props> = ({ onPress, selected, imageSource, color }) => {
    return (
        <Pressable style={styles.square} onPress={onPress}>
            <Image
                style={styles.image}
                source={imageSource}
            />
            {selected && <TemplateIcon name={'check'} color={color} size={25} family={'Feather'}></TemplateIcon>}
        </Pressable>
    )
}

export default TexturePickerButton

const styles = StyleSheet.create({
    image: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: 'absolute',
    },
    square: {
        marginHorizontal: SPACE_SMALL,
        marginBottom: SPACE_SMALL,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        aspectRatio: 0.7,
        borderColor: WHITE,
        borderWidth: BORDER_XSMALL,
        borderRadius: RADIUS_SMALL,
        overflow: 'hidden',
    },
})