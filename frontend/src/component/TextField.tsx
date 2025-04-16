import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet, Animated, ViewStyle } from 'react-native'

type TextFieldProps = {
    value?: string
    onChangeText?: (text: string) => void
    placeholder?: string
    style?: ViewStyle
    editable?: boolean
}

const TextFieldComponent: React.FC<TextFieldProps> = ({
    value,
    onChangeText,
    placeholder,
    style,
    editable = true
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const labelAnim = useState(new Animated.Value(value ? 1 : 0))[0]

    useEffect(() => {
        Animated.timing(labelAnim, {
            toValue: isFocused || value ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value])

    const labelStyle = {
        position: 'absolute',
        left: 8,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [14, -10],
        }),
        fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: '#555',
        backgroundColor: '#fff',
        paddingHorizontal: 3,
    }
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.content}>
                <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={styles.input}
                    editable={editable}
                    selectTextOnFocus={editable}
                    multiline={true}
                />
            </View>
        </View>
    )
}

export default TextFieldComponent

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '90%',
        height: '100%'
    },
    input: {
        borderWidth: 1,
        fontSize: 16,
        padding: 10, 
        marginBottom: 12, 
        borderRadius: 8,
        width: '100%',
        height: '100%'
    }
})