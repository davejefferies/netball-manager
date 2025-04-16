import { Modal, View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ModalWrapper from '../component/ModalWrapper'

export default function PauseMatchModal({ visible, onClose, onPause, onQuarterEnd, onGameEnd }) {
    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
        >
            <Pressable onPress={onPause}>
                <LinearGradient
                    colors={['#02ae40', '#6dfea1']}
                    start={{ x: -1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}>
                    <Text style={styles.text}>Pause Game</Text>
                </LinearGradient>
            </Pressable>
            <Pressable onPress={onQuarterEnd}>
                <LinearGradient
                    colors={['#02ae40', '#6dfea1']}
                    start={{ x: -1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}>
                    <Text style={styles.text}>Quarter Ended</Text>
                </LinearGradient>
            </Pressable>
            <Pressable onPress={onGameEnd}>
                <LinearGradient
                    colors={['#02ae40', '#6dfea1']}
                    start={{ x: -1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}>
                    <Text style={styles.text}>Close Game</Text>
                </LinearGradient>
            </Pressable>
        </ModalWrapper>
    )
}

const styles = StyleSheet.create({
    
})