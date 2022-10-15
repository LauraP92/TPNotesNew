import { ColorValue, Image, Pressable, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { BORDER_SMALL, RADIUS_MEDIUM, SCREEN_HEIGHT, SCREEN_WIDTH, SPACE_MEDIUM, SPACE_XLARGE, SPACE_XXLARGE } from '../constants/LAYOUT';
import TemplateText from './TemplateText';
import { BLUE, WHITE } from '../constants/COLORS';
import TemplateIcon from './TemplateIcon';

interface Props {
    title: string | undefined,
    description: string | undefined,
    backgroundColor: ColorValue,
    textColor: ColorValue,
    imageSource: false | number | { uri: string },
    onLongPress: () => void,
    onPress: () => void,
    isSelected: boolean,
    selectionStarted: boolean,
}

const NoteCard: FC<Props> = ({ backgroundColor, textColor, title, description, imageSource, onLongPress, isSelected, onPress, selectionStarted }) => {
    return (
        <Pressable
            style={[styles.button, { backgroundColor: backgroundColor, borderColor: !backgroundColor && !imageSource || backgroundColor === WHITE ? BLUE : undefined, borderWidth: !backgroundColor && !imageSource || backgroundColor === WHITE ? BORDER_SMALL : 0 }]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            {!!imageSource && (<Image style={styles.image} source={imageSource} />)}
            <View style={styles.cardContent}>
                <TemplateText style={{ color: textColor }}>{title || description}</TemplateText>
                <TemplateIcon name='paint-roller' family='FontAwesome5' size={60} color={textColor} style={{ transform: [{ rotateZ: '-90deg' }, { rotateX: '360deg' }], opacity: 0.5 }}></TemplateIcon>
                {!!selectionStarted && (<Pressable style={styles.circle} onPress={onPress}>
                    {!!isSelected && <TemplateIcon style={styles.icon} name={'check'} family={'Feather'} size={20} color={BLUE}></TemplateIcon>}
                </Pressable>)}
            </View>
        </Pressable >
    );
};

export default NoteCard;

const styles = StyleSheet.create({
    button: {
        height: 80,
        marginRight: SPACE_XXLARGE,
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
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        marginHorizontal: SPACE_MEDIUM,
        height: 25,
        width: 25,
        borderRadius: RADIUS_MEDIUM,
        borderColor: BLUE,
        borderWidth: BORDER_SMALL,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCheck: {
        position: 'absolute',
    },
});
