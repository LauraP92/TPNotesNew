import { StyleSheet, Pressable, ColorValue } from 'react-native';
import React, { FC } from 'react';
import { BORDER_XSMALL, RADIUS_MEDIUM, SPACE_MEDIUM, SPACE_XXSMALL } from '../constants/LAYOUT';
import TemplateIcon from './TemplateIcon';
import { WHITE } from '../constants/COLORS';

interface Props {
    color: ColorValue,
    onPress: () => void,
    selected: boolean,
}
const ColorPickerButton: FC<Props> = ({ color, onPress, selected }) => {
    return (
        <Pressable style={[styles.circle, { backgroundColor: color }]} onPress={onPress}>
            {selected && <TemplateIcon style={styles.icon} name={'check'} color={WHITE} size={25} family={'Feather'}></TemplateIcon>}
        </Pressable>
    );
};

export default ColorPickerButton;

const styles = StyleSheet.create({
    circle: {
        marginLeft: SPACE_MEDIUM,
        height: 30,
        width: 30,
        borderRadius: RADIUS_MEDIUM,
        borderColor: WHITE,
        borderWidth: BORDER_XSMALL,
    },
    icon: {
        alignSelf: 'center',
        marginTop: SPACE_XXSMALL,
    },
});
