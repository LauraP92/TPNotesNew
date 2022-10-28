import { StyleSheet, Pressable, ColorValue } from 'react-native';
import React, { FC } from 'react';
import TemplateIcon, { IconFamilyType } from './TemplateIcon';
import { SPACE_MEDIUM } from '../constants/LAYOUT';

interface Props {
    name: string,
    size: number,
    family: IconFamilyType,
    onPress: () => void,
    isActive: boolean,
    color: ColorValue,
}

const IconButton: FC<Props> = ({ name, size, color, onPress, family, isActive }) => {
    return (
        <Pressable style={[styles.container, { opacity: isActive === true ? 1 : 0.5 }]} onPress={onPress}>
            <TemplateIcon
                name={name}
                size={size}
                family={family}
                color={color}
            />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        margin: SPACE_MEDIUM,
    }
});
