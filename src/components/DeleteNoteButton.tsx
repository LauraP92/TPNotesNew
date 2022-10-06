import { StyleSheet, Pressable, ColorValue } from 'react-native';
import React, { FC } from 'react';
import TemplateIcon from './TemplateIcon';

interface Props {
    onPress: () => void,
    color: ColorValue,
}

const DeleteNoteButton: FC<Props> = ({ onPress, color }) => {
    return (
        <Pressable onPress={onPress} >
            <TemplateIcon name="trash" size={30} color={color} family='Feather' />
        </Pressable>
    );
};

export default DeleteNoteButton;

const styles = StyleSheet.create({
});
