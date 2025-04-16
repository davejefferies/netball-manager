import { ViewStyle, Text, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonProps = {
    label: string
    color?: string[]
    onPress: () => void
    style?: ViewStyle
    containerStyle?: ViewStyle
}

const Button: React.FC<ButtonProps> = ({ label, color = ['#02ae40', '#6dfea1'], onPress, style, containerStyle}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
            <LinearGradient
                colors={[color[0], (color.length > 1 ? color[1] : color[0])]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, style]}>
                <Text style={styles.text}>{label}</Text>
            </LinearGradient>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    button: {
        padding: 15, 
        borderRadius: 6
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})