import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, Platform } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { createTeam, updateTeam } from '../api/teamApi'
import { fetchSportPositions } from '../api/sportApi'
import { Ionicons } from '@expo/vector-icons'
import ScreenWrapper from './ScreenWrapper'
import { TextInput, MultiSelect } from '../component'

type TeamMember = {
    id?: string
    name: string; 
    positions?: string[]
}

const ModifyTeamScreen: React.FC = () => {
    const route = useRoute<any>()
    const navigation = useNavigation()
    const editing = !!route.params?.team

    const [teamName, setTeamName] = useState('')
    const [teamCoach, setTeamCoach] = useState('')
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [positions, setPositions] = useState<string[]>([])

    useEffect(() => {
        if (editing) {
            const { name, coach, members } = route.params.team
            setTeamName(name)
            setTeamCoach(coach || '')
            setTeamMembers(members || [])
        }
    }, [])

    const loadPositions = async () => {
            try {
                const { data } = await fetchSportPositions()
                setPositions(data || [])
            } catch (err: any) {
                console.error(err.message)
            } finally {
                setLoading(false)
            }
    }
    
    useFocusEffect(
        useCallback(() => {
            loadPositions()
        }, [])
    )

    const handleAddMember = () => {
        setTeamMembers([...teamMembers, { name: '', positions: [] }]);
    }

    const handleMemberChange = (index: number, field: keyof TeamMember, value: any) => {
        console.log(index, field, value)
        const updated = [...teamMembers];
        updated[index][field] = value;
        setTeamMembers(updated);
    };

    const handleRemoveMember = (index: number) => {
        const updated = [...teamMembers]
        updated.splice(index, 1)
        setTeamMembers(updated)
    }

    const handleSubmit = async () => {
        if (!teamName.trim()) return Alert.alert('Please enter a team name')

        try {
            if (editing) {
                await updateTeam(route.params.team.id, { name: teamName, coach: teamCoach, members: teamMembers.filter((member: any) => member.name && member.name.trim() !== '') })
            } else {
                await createTeam({ name: teamName, coach: teamCoach, members: teamMembers.filter((member: any) => member.name && member.name.trim() !== '') })
            }
            navigation.goBack()
        } catch (err: any) {
            console.log(err)
            Alert.alert('Error', err.message)
        }
    }

    const renderTeamMember = ({ item, index }: { item: TeamMember; index: number }) => (
        <View style={styles.memberRow}>
            <TextInput
                style={styles.memberInput}
                placeholder="Name"
                value={item.name}
                onChangeText={(text) => handleMemberChange(index, 'name', text)}
            />
            <View style={[styles.memberPositions, { flex: 1, position: 'relative', zIndex: 10 }]}>
                <MultiSelect
                    options={positions.map((obj: any) => obj.code)}
                    value={item.positions}
                    onChange={(positions) => handleMemberChange(index, 'positions', positions)}
                    placeholder="+ Add Position"
                ></MultiSelect>
            </View>
            <TouchableOpacity onPress={() => handleRemoveMember(index)}>
            <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )

    return (
        <ScreenWrapper title={editing ? 'Edit Team' : 'Add Team'} addText={undefined} addEvent={undefined}>
            <TextInput placeholder="Team Name" value={teamName} onChangeText={setTeamName} />
            <TextInput placeholder="Coach Name" value={teamCoach} onChangeText={setTeamCoach} />

            <Text style={styles.subHeading}>Team Members</Text>

            <FlatList
                style={[styles.memberList, {overflow: 'visible'}]}
                scrollEnabled={false}
                data={teamMembers}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderTeamMember}
                ListFooterComponent={
                    <TouchableOpacity onPress={handleAddMember} style={styles.addMemberBtn}>
                        <Text style={styles.addMemberText}>+ Add Member</Text>
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity onPress={handleSubmit} style={[styles.submitButton]}>
                <Text style={styles.submitText}>{editing ? 'Update Team' : 'Create Team'}</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
};

export default ModifyTeamScreen;

const styles = StyleSheet.create({
    input: { 
        borderWidth: 1, 
        padding: 10, 
        marginBottom: 12, 
        borderRadius: 8,
        width: '90%'
    },
    subHeading: { 
        fontWeight: 'bold', 
        marginTop: 16, 
        marginBottom: 8 
    },
    memberRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10, 
        gap: 8 
    },
    memberInput: { 
        flex: 1
    },
    memberPositions: {
        flex: 1,
        position: 'relative',
        zIndex: 10
    },
    addMemberBtn: { 
        marginVertical: 10,

    },
    addMemberText: { 
        color: '#1c7ed6', 
        fontWeight: '600' 
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
    },
    memberList: {
        width: '90%'
    }
});
