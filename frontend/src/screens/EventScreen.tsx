import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { CourtComponent } from '../component'
import { fetchEvents } from '../api/eventApi'
import ScreenWrapper from './ScreenWrapper'

const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android'

const EventScreen: React.FC = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const route = useRoute()
    const { team } = route.params
    const navigation = useNavigation()

    const loadEvents = async () => {
        try {
            const { data } = await fetchEvents(team.id)
            setEvents(data || [])
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadEvents()
        }, [])
    )

    return (
        <ScreenWrapper title={'Events'} addText={'New Event'} addEvent={() => navigation.navigate("ModifyEvent", { team })}>
            <View style={styles.tileContainer}>
                {events.map((item : any) => (
                    <TouchableOpacity key={item.id} style={styles.eventCard} onPress={() => {
                        if (item.type.id === 1) navigation.navigate("TrainingDetail", { team, event: item })
                        else if (item.type.id === 2) navigation.navigate("Match", { team, event: item })
                    }}>
                        <View>
                            <View style={styles.eventCourt}>
                                <CourtComponent orientation={'landscape'} width={200} style={{ margin: 16 }} />
                            </View>
                            <Text style={styles.eventType}>{ item.type.name }</Text>
                            <Text style={styles.eventTitle}>{ item.type.text || 'vs ' + item.opponent }</Text>
                        </View>
                        <Text style={styles.eventDate}>{item.date}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScreenWrapper>
    )
}

export default EventScreen

const styles = StyleSheet.create({
    tileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
        marginTop: 15
    },
    eventCard: {
        borderRadius: 10,
        marginBottom: 12,
        width: 232,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 3,
        cursor: 'pointer'
      },
      eventCourt: {
        backgroundColor: '#4287f5', 
        opacity: 0.5,
        width: '100%'
    },
      eventTitle: {
        fontSize: 26,
        fontWeight: 500,
        marginBottom: 4,
        textAlign: 'center',
        position: 'absolute',
        top: '37%',
        left: 0,
        right: 0
      },
      eventType: {
        color: '#0254d8', 
        fontSize: 20,
        marginBottom: 2,
        fontWeight: 500,
        textAlign: 'center',
        position: 'absolute',
        top: '16%',
        left: 0,
        right: 0
      },
      eventDate: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        margin: 10
      }
})