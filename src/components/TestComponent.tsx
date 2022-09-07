import { ColorValue, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, useState } from 'react'

interface Props {
    type: 'large' | 'medium' | 'small',
    title: { name: string | null },
    color: ColorValue,
    textStyle: TextStyle,
    containerStyle: ViewStyle | (ViewStyle | false)[],
    testProp?: boolean | number | string | boolean[],
}

const TestComponent: FC<Props> = ({ title, color, textStyle, containerStyle, testProp }) => {
    const test = title.name

    const [testState, setTestState] = useState<'laura' | 'andrei' | 'sid'>('andrei')

    return (
        <Pressable style={containerStyle} onPress={() => {
            setTestState('laura')
        }} >
            <Text style={textStyle}>{title.name}</Text>
        </Pressable>
    )
}

export default TestComponent

const styles = StyleSheet.create({

})