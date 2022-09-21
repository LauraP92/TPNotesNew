import { ColorValue, Pressable, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { SPACE_XLARGE } from '../constants/LAYOUT';
import TemplateText from './TemplateText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
    title: string | undefined,
    description: string | undefined,
    color: ColorValue,
    id: number,
    navigation: NativeStackNavigationProp<any>
}

const NoteCard: FC<Props> = ({ id, navigation, color, title, description }) => {

    return (
        <Pressable
            style={[styles.button, { backgroundColor: color }]}
            onPress={() => {
                navigation.navigate('NoteDetails', {
                    id: id,
                })
            }}
        >
            <TemplateText>{title || description}</TemplateText>
            {/* <TemplateText>{title ? title : description}</TemplateText> */}
        </Pressable >
    );
};

export default NoteCard;

const styles = StyleSheet.create({
    button: {
        height: 80,
        marginRight: SPACE_XLARGE,
        marginBottom: SPACE_XLARGE,
        justifyContent: 'center',
    },
});
