import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import React, { FC } from 'react';
import { BLACK } from '../constants/COLORS';
import { FONT_SMALL, SPACE_SMALL } from '../constants/LAYOUT';

interface Props extends TextProps {
    style?: TextStyle,
    children?: string | React.ReactChild | null | false | (string | React.ReactChild | null | false)[],
}
const TemplateText: FC<Props> = ({ style, children, ...restProps }) => {
    return (
        <Text style={[styles.title, style]} {...restProps}>{children}</Text>
    );
};

export default TemplateText;

const styles = StyleSheet.create({
    title: {
        color: BLACK,
        fontSize: FONT_SMALL,
        marginLeft: SPACE_SMALL,
    },
});
