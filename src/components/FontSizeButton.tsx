import { StyleSheet, Pressable, ColorValue } from 'react-native';
import React, { FC } from 'react';
import { BORDER_SMALL, RADIUS_MEDIUM, SPACE_MEDIUM } from '../constants/LAYOUT';
import { WHITE } from '../constants/COLORS';
import TemplateText from './TemplateText';

interface Props {
    color: ColorValue,
    onPress: () => void,
    selected: boolean,
    name: string,
}
const FontSizeButton: FC<Props> = ({ color, onPress, selected, name }) => {
    return (
        <Pressable style={[styles.circle, { borderColor: color, opacity: selected ? 1 : 0.5 }]} onPress={onPress} >
            <TemplateText style={[styles.text, { color: color }]}>{name}</TemplateText>
        </Pressable>
    );
};

export default FontSizeButton;

const styles = StyleSheet.create({
    circle: {
        marginHorizontal: SPACE_MEDIUM,
        height: 30,
        minWidth: 70,
        borderRadius: RADIUS_MEDIUM,
        borderWidth: BORDER_SMALL,
        justifyContent: 'center',
        backgroundColor: WHITE,
    },
    text: {
        textAlign: 'center',
    },
});
