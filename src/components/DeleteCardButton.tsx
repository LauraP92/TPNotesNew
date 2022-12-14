import { Pressable, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { BLUE } from '../constants/COLORS';
import { BORDER_MEDIUM, RADIUS_XXLARGE, SPACE_LARGE } from '../constants/LAYOUT';
import TemplateIcon from './TemplateIcon';

interface Props {
    onPress: () => void,
}

const DeleteCardButton: FC<Props> = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.circle}
                onPress={onPress}>
                <TemplateIcon name='delete-empty' size={40} color={BLUE} family='MaterialCommunityIcons' />
            </Pressable>
        </View>
    );
};

export default DeleteCardButton;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: SPACE_LARGE,
        bottom: SPACE_LARGE,
    },
    circle: {
        borderWidth: BORDER_MEDIUM,
        borderRadius: RADIUS_XXLARGE,
        borderColor: BLUE,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
