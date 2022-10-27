import { Animated, ColorValue, Image, Pressable, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { BORDER_SMALL, RADIUS_MEDIUM, SCREEN_HEIGHT, SCREEN_WIDTH, SPACE_MEDIUM, SPACE_SMALL, SPACE_XLARGE, SPACE_XXLARGE } from '../constants/LAYOUT';
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
    index: number,
}

const NoteCard: FC<Props> = ({ index, backgroundColor, textColor, title, description, imageSource, onLongPress, isSelected, onPress, selectionStarted }) => {
    const animatedPosition = useRef(new Animated.ValueXY({ x: - (SCREEN_WIDTH - SPACE_XXLARGE), y: 0 })).current;

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: !!isSelected || !selectionStarted ? SCREEN_WIDTH : SCREEN_WIDTH - 80,
            duration: 500,
            useNativeDriver: false,
        }
        ).start();
    }, [isSelected, selectionStarted])

    useEffect(() => {
        // setTimeout(() => {
        Animated.timing(animatedPosition, {
            toValue: { x: 0, y: 0 },
            duration: selectionStarted ? 300 : 700,
            useNativeDriver: false,
        }).start()
        // }, index * 200);
    }, [])

    return (
        <Animated.View                // Special animatable View
            style={{
                transform: [{ translateX: animatedPosition.x }, { translateY: animatedPosition.y }],
                width: animatedWidth,
            }}
        >
            <Pressable
                style={[styles.button, { backgroundColor: backgroundColor }, ((!backgroundColor && !imageSource) || (!imageSource && backgroundColor === WHITE)) && { borderColor: BLUE, borderWidth: BORDER_SMALL }]}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                {!!imageSource && (<Image style={styles.image} source={imageSource} />)}
                <View style={styles.cardContent}>
                    <TemplateText numberOfLines={3} style={[styles.text, { color: textColor }]}>{title || description}</TemplateText>
                    <TemplateIcon name='paint-roller' family='FontAwesome5' size={60} color={textColor} style={{ transform: [{ rotateZ: '-90deg' }, { rotateX: '360deg' }], opacity: 0.5 }}></TemplateIcon>
                    {!!selectionStarted && (<Pressable style={styles.circle} onPress={onPress}>
                        {!!isSelected && <TemplateIcon style={styles.icon} name={'check'} family={'Feather'} size={20} color={BLUE}></TemplateIcon>}
                    </Pressable>)}
                </View>
            </Pressable >
        </Animated.View>
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
    text: {
        marginLeft: SPACE_SMALL,
        flex: 1,
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
