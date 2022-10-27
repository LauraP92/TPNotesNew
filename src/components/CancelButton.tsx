import { StyleSheet, Pressable, Animated } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import TemplateText from './TemplateText';
import { BORDER_SMALL, RADIUS_MEDIUM, SPACE_MEDIUM } from '../constants/LAYOUT';
import { BLUE } from '../constants/COLORS';

interface Props {
    onPress: () => void,
    isPressed: boolean,
}

const CancelButton: FC<Props> = ({ onPress, isPressed }) => {
    const pan = useRef(new Animated.ValueXY({ x: 80, y: 0 })).current;

    useEffect(() => {
        Animated.timing(pan, {
            toValue: { x: isPressed ? 0 : 80, y: 0 },
            duration: 300,
            useNativeDriver: true,
        }
        ).start();
    }, [isPressed])

    return (
        <Animated.View                 // Special animatable View
            style={{
                transform: [{ translateX: pan.x }, { translateY: pan.y }]
            }}
        >
            <Pressable onPress={onPress} style={styles.button}>
                <TemplateText style={styles.text}>Cancel</TemplateText>
            </Pressable>
        </Animated.View>
    );
};

export default CancelButton;

const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 65,
        justifyContent: 'center',
        borderWidth: BORDER_SMALL,
        borderColor: BLUE,
        borderRadius: RADIUS_MEDIUM,
        marginRight: SPACE_MEDIUM,
        backgroundColor: `${BLUE}25`,
    },
    text: {
        color: BLUE,
        textAlign: 'center',
    },
});
