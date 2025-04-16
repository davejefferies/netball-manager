import React from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Pressable,
    ScrollView,
    Platform
} from 'react-native'
import { Button } from '../component'

type ModalWrapperProps = {
    visible: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    scrollable?: boolean
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    visible,
    onClose,
    title,
    children
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
        <View style={styles.backdrop}>
            <View style={styles.modalContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
                <View style={styles.content}>{children}</View>
                <Button label={'Close'} color={['#cf020c']} onPress={onClose} containerStyle={styles.closeButton} />
            </View>
        </View>
        </Modal>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '80%',
        maxHeight: Platform.OS === 'web' ? '80vh' : '80%',
        minHeight: Platform.OS === 'web' ? '80vh' : '80%',
        height: Platform.OS === 'web' ? '80vh' : '80%',
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center'
    },
    content: {
        flexGrow: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },

    closeButton: {
        marginTop: 16,
    }
})
