import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, Platform } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { createEvent, updateEvent } from '../api/eventApi'
import { fetchEventTypes } from '../api/eventApi'
import { Ionicons } from '@expo/vector-icons'
import { MultiSelect } from '../component'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput, Dropdown, DurationSelector, DateTime, Checkbox } from '../component'
import ScreenWrapper from './ScreenWrapper'

const ModifyEventScreen: React.FC = () => {
    const [eventOpponent, setEventOpponent] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [type, setType] = useState({id: 0, name: null, text: null})
    const [teamId, setTeamId] = useState(0)
    const [eventTypeId, setEventType] = useState(null)
    const [eventFrequencyId, setEventFrequency] = useState(null)
    const [duration, setDuration] = useState({ hours: 0, minutes: 0 })
    const [startTime, setStartTime] = useState(new Date())
    const [eventEndDate, setEventEndDate] = useState('')
    const [loading, setLoading] = useState(true)
    const [repeat, setRepeat] = useState(false)
    const [types, setTypes] = useState<string[]>([])
    const route = useRoute<any>()
    const navigation = useNavigation()
    const editing = !!route.params?.event

    useEffect(() => {
        if (editing) {
            const { teamId, typeId, opponent, location, date, duration, frequencyId, endDate } = route.params.event
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60
            setTeamId(teamId)
            setEventType(typeId)
            setEventOpponent(opponent)
            setEventLocation(location)
            setStartTime(date)
            setDuration({hours, minutes})
            setEventFrequency(frequencyId)
            setEventEndDate(endDate)
        }
        if (eventTypeId) {
            const t: any = types.find((t: any) => t.id === eventTypeId)
            if (t) {
                setType(t)
                if (t.text) setEventOpponent(t.text)
            }
        }
    })

    const loadTypes = async () => {
        try {
            const { data } = await fetchEventTypes()
            setTypes(data || [])
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTypes()
        }, [])
    )

    const handleSubmit = async () => {
        try {
            if (editing) {
                
            } else {
                await createEvent(route.params.team.id, {
                    opponent: eventOpponent,
                    location: eventLocation,
                    type: eventTypeId,
                    date: startTime,
                    duration: (+duration.minutes + (+duration.hours * 60))
                })
            }
            navigation.goBack()
        } catch (err: any) {
            console.log(err)
            Alert.alert('Error', err.message)
        }
    }

    return (
        <ScreenWrapper title={editing ? 'Edit Event' : 'Add Event'} addText={undefined} addEvent={undefined}>
            <Dropdown label={'Type'} options={types} value={eventTypeId} onChange={setEventType}></Dropdown>
            <TextInput placeholder="Opponent" value={eventOpponent} onChangeText={setEventOpponent} editable={!(!!type.text)} />
            <TextInput placeholder="Location" value={eventLocation} onChangeText={setEventLocation} />
            <View style={styles.row}>
                <DateTime
                    value={startTime}
                    onChange={setStartTime}
                    mode="datetime"
                    label="Start Time"
                />
                <DurationSelector
                    hours={duration.hours}
                    minutes={duration.minutes}
                    onChange={setDuration}
                />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={[styles.submitButton]}>
                <Text style={styles.submitText}>{editing ? 'Update Event' : 'Create Event'}</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default ModifyEventScreen

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
        height: 80,
        minHeight: 80,
        maxHeight: 80
    },
    checkbox: {
        margin: 8
    },
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