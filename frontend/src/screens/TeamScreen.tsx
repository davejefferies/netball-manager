import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { fetchTeams } from '../api/teamApi'
import ScreenWrapper from './ScreenWrapper'

type Team = {
    id: string
    name: string
    coach?: string
}

const TeamScreen: React.FC = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    const handleDelete = async (teamId: string) => {}

    const loadTeams = async () => {
        try {
            const { data } = await fetchTeams()
            setTeams(data || [])
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTeams()
        }, [])
    )

    const renderTeam = ({ item }: { item: Team }) => (
        <View style={styles.card} key={item.id}>
            <View style={styles.cardHeader}>
                <Text style={styles.teamName}>{item.name}</Text>
                <View style={styles.iconActions}>
                    <TouchableOpacity onPress={() => navigation.navigate('ModifyTeam', { team: item })}>
                        <Ionicons name="create-outline" size={20} color="#1c7ed6" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Ionicons name="trash-outline" size={20} color="#e03131" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.coach}>Coach: {item.coach || 'To Be Confirmed'}</Text>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButtonDisabled} disabled={true}>
                    <Text style={styles.actionText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => {
                    navigation.navigate("Events", { team: item })
                }}>
                    <Text style={styles.actionText}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonDisabled} disabled={true}>
                    <Text style={styles.actionText}>Stats</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <ScreenWrapper title={'Teams'} addText={'New Team'} addEvent={() => navigation.navigate("ModifyTeam")} showBack={false}>
            {teams.map(team => renderTeam({ item: team }))}
        </ScreenWrapper>
    )
}

export default TeamScreen

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        width: '100%'
    },
    teamName: {
        fontSize: 18,
        fontWeight: '600'
    },
    iconActions: {
        flexDirection: 'row',
        gap: 8,
    },
    icon: {
        marginLeft: 12,
    },
    coach: {
        marginTop: 4,
        color: '#555'
    },
    actions: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 8
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#e3f2fd',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    actionText: {
        color: '#1c7ed6',
        fontWeight: '600'
    },
    actionButtonDisabled: {
        flex: 1,
        backgroundColor: '#e3f2fd',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        opacity: 0.5
    }
})