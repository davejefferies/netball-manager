import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import ScreenWrapper from './ScreenWrapper'
import { fetchTrainingItems } from '../api/trainingApi'

type TrainingItem = {
    id: string
    name: string
    duration: string
    notes?: string | null | undefined
}

const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return (hours ? `${hours} Hour${hours > 1 ? 's ' : ' '}` : '') + (minutes ? `${minutes} Mins` : '')
}

const TrainingDetailScreen: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [trainingItems, setTrainingItems] = useState([])
    const route = useRoute<any>()
    const { team, event } = route.params
    const navigation = useNavigation()

    const loadItems = async () => {
        try {
            const { data } = await fetchTrainingItems(team.id, event.id)
            setTrainingItems(data || [])
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadItems()
        }, [])
    )

    return (
        <ScreenWrapper title={`${team.name} Training Event - ${event.date}`} addText={'New Activity'} addEvent={() => navigation.navigate("ModifyTraining", { team, event })}>
            <View style={styles.itemContainer}>
                {trainingItems.map((item: TrainingItem) => (
                    <View style={styles.eventItem} key={item.id}>
                        <View>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text style={styles.itemDuration}>{formatDuration(item.duration)}</Text>
                            {item.notes && <Text style={styles.itemNotes}>{item.notes}</Text>}
                        </View>
                    </View>
                ))}
            </View>
        </ScreenWrapper>
    )
}

export default TrainingDetailScreen;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
        marginTop: 15,
        width: '100%'
    },
    eventItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600'
    },
    itemDuration: {
        fontSize: 14,
        color: '#1c7ed6'
    },
    itemNotes: {
        fontSize: 12,
        color: '#555',
        marginTop: 4
    }
})
  