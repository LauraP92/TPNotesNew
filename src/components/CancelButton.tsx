import { StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import TemplateText from './TemplateText';
import { BORDER_SMALL, RADIUS_MEDIUM, SPACE_MEDIUM } from '../constants/LAYOUT';
import { BLUE } from '../constants/COLORS';

interface Props {
    onPress: () => void,
}

const CancelButton: FC<Props> = ({ onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <TemplateText style={styles.text}>Cancel</TemplateText>
        </Pressable>
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
    },
});
