import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { BLUE } from '../constants/COLORS';
import { BORDER_MEDIUM, RADIUS_XXLARGE, SPACE_LARGE } from '../constants/LAYOUT';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
    navigation: NativeStackNavigationProp<any>
}

const AddNoteButton: FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.circle}
                onPress={() => navigation.navigate('NoteDetails')}>
                <Text style={styles.sign}>+</Text>
            </Pressable>
        </View>
    );
};

export default AddNoteButton;

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
    },
    sign: {
        color: BLUE,
        fontSize: 60,
        lineHeight: 60,
        fontWeight: '300',
    },
});
