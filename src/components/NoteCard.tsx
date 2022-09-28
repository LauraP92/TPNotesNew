import { ColorValue, Image, Pressable, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACE_XLARGE } from '../constants/LAYOUT';
import TemplateText from './TemplateText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BLACK, WHITE } from '../constants/COLORS';

interface Props {
    title: string | undefined,
    description: string | undefined,
    backgroundColor: ColorValue,
    textColor: ColorValue,
    id: number,
    navigation: NativeStackNavigationProp<any>,
    imageSource: number | { uri: string },
}

const NoteCard: FC<Props> = ({ id, navigation, backgroundColor, textColor, title, description, imageSource }) => {

    return (
        <Pressable
            style={[styles.button, { backgroundColor: backgroundColor, borderColor: backgroundColor === WHITE ? BLACK : WHITE, borderWidth: backgroundColor === WHITE ? 1 : 0 }]}
            onPress={() => {
                navigation.navigate('NoteDetails', {
                    id: id,
                })
            }}
        >
            <Image
                style={styles.image}
                source={imageSource}
            />
            <TemplateText style={{ color: textColor }}>{title || description}</TemplateText>
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
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    image: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: 'absolute',
        opacity: 0.5,
    },
});
