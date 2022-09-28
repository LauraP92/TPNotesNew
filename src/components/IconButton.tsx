import { StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import TemplateIcon, { IconFamilyType } from './TemplateIcon';
import { BLUE } from '../constants/COLORS';
import { SPACE_MEDIUM } from '../constants/LAYOUT';

interface Props {
    name: string,
    size: number,
    family: IconFamilyType,
    onPress: () => void,
    isActive: boolean,
}

const IconButton: FC<Props> = ({ name, size, onPress, family, isActive }) => {
    return (
        <Pressable style={[styles.container, { opacity: isActive === true ? 1 : 0.5 }]} onPress={onPress}>
            <TemplateIcon
                name={name}
                size={size}
                family={family}
                color={BLUE}
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
