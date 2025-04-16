import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'

type NumberSelectorProps = {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    style?: ViewStyle
    disabled?: boolean
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    style,
    disabled = false
}) => {
    const decrease = () => {
        if (value - step >= min) onChange(value - step)
    }
    
    const increase = () => {
        if (value + step <= max) onChange(value + step)
    }

    return (
        <View style={[styles.wrapper, style, disabled && { opacity: 0.5 }]}>
            <TouchableOpacity onPress={decrease} disabled={disabled || value <= min} style={styles.button}>
                <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.value}>{value}</Text>
            <TouchableOpacity onPress={increase} disabled={disabled || value >= max} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NumberSelector

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 12
    },
    button: {
        backgroundColor: '#1c7ed6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 20,
        fontWeight: '600',
        minWidth: 40,
        textAlign: 'center',
    }
})