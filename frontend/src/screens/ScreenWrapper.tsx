import React, { ReactNode } from 'react'
import { View, StyleSheet, Platform, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type ScreenWrapperProps = {
    title?: string
    children?: ReactNode
    addText?: string
    addEvent?: () => void
    onBack?: () => void | null
    showBack?: boolean
}

const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android'

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, title, addText, addEvent, showBack = true, onBack = null }) => {
    const navigation = useNavigation()

    if (showBack && !onBack) {
        onBack = () => navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={isWeb ? styles.container : ''}>
                <View style={isWeb ? styles.box : ''}>
                    <View style={styles.header}>
                        {showBack && onBack ? (
                            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                                <Text style={styles.backButtonText}>← Back</Text>
                            </TouchableOpacity>
                        ) : <View style={{ width: 60 }} />}
                        <Text style={styles.heading}>{title}</Text>
                        {(addEvent && addText) ? (<TouchableOpacity style={styles.addButton} onPress={addEvent}>
                            <Text style={styles.addButtonText}>+ {addText}</Text>
                        </TouchableOpacity>) : null}
                    </View>
                    {children}
                </View>
            </View>
        </ScrollView>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    scrollContainer: {
        minHeight: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: '#1c7ed6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: '#f9f9f9',
        padding: 24,
        borderRadius: 16,
        width: '90%',
        maxWidth: 800,
        alignItems: 'center',
        elevation: 5,
        flex: 1,
        margin: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16
    },
    heading: {
        fontSize: 22,
        fontWeight: '700'
    },
    addButton: {
        backgroundColor: '#1c7ed6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600'
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#ccc',
        borderRadius: 6
    },
    backButtonText: {
        fontWeight: '600',
        color: '#000'
    }
})