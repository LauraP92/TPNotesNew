import { StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import TemplateIcon from './TemplateIcon';
import { BLUE } from '../constants/COLORS';

interface Props {
    onPress: () => void
}

const DeleteNoteButton: FC<Props> = ({ onPress }) => {
    return (
        <Pressable onPress={onPress} >
            <TemplateIcon name="trash" size={30} color={BLUE} family='Feather' />
        </Pressable>
    );
};

export default DeleteNoteButton;

const styles = StyleSheet.create({
});
