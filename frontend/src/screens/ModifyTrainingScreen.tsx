import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, Platform } from 'react-native'
import { TextInput, DurationSelector, TextField } from '../component'
import ScreenWrapper from './ScreenWrapper'
import { createTrainingItem } from '../api/trainingApi'

const ModifyTrainingScreen: React.FC = () => {
    const [name, setName] = useState('')
    const [duration, setDuration] = useState({ hours: 0, minutes: 0 })
    const [notes, setNotes] = useState('')
    const route = useRoute<any>()
    const navigation = useNavigation()
    const editing = !!route.params?.item

    const handleSubmit = async () => {
        try {
            if (editing) {
                        
            } else {
                await createTrainingItem(route.params.team.id, route.params.event.id, {
                    name,
                    duration: (+duration.minutes + (+duration.hours * 60)),
                    notes
                })
            }
            navigation.goBack()
        } catch (err: any) {
            console.log(err)
            Alert.alert('Error', err.message)
        }
    }

    return (
        <ScreenWrapper title={editing ? 'Edit Training Item' : 'Add Training Item'} addText={undefined} addEvent={undefined}>
            <TextInput placeholder="Title" value={name} onChangeText={setName} />
            <DurationSelector
                hours={duration.hours}
                minutes={duration.minutes}
                onChange={setDuration}
            />
            <TextField placeholder="Notes" value={notes} onChangeText={setNotes} />
            <TouchableOpacity onPress={handleSubmit} style={[styles.submitButton]}>
                <Text style={styles.submitText}>{editing ? 'Update Event' : 'Create Event'}</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default ModifyTrainingScreen

const styles = StyleSheet.create({
    submitButton: { 
        backgroundColor: '#1c7ed6', 
        padding: 14, 
        borderRadius: 8, 
        alignItems: 'center', 
        marginTop: 40,
        marginBottom: 40
    },
    submitText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16 
    }
})