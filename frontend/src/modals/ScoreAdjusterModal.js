import { useState } from 'react'
import { Modal, View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, NumberSelector } from '../component'
import ModalWrapper from '../component/ModalWrapper'

export default function ScoreAdjusterModal({ visible, onClose, homeTeam, awayTeam, homeScore, awayScore, onChange, onChangeCentrePass }) {
    const [scoreFor, setHomeScore] = useState(homeScore)
    const [scoreAgainst, setAwayScore] = useState(awayScore)

    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            title={'Score Adjust'}
        >
            <Text style={styles.teamName}>{homeTeam}</Text>
            <NumberSelector value={scoreFor} onChange={(value) => {
                setHomeScore(value)
            }} />
            <Text style={styles.teamName}>{awayTeam}</Text>
            <NumberSelector value={scoreAgainst} onChange={(value) => {
                setAwayScore(value)
            }} />
            <Button 
                label={'Change Score'} 
                onPress={() => onChange(scoreFor, scoreAgainst)} 
            />
            <Button 
                label={'Change Centre Pass'} 
                onPress={onChangeCentrePass} 
            />
        </ModalWrapper>
    )
}

const styles = StyleSheet.create({
    teamName: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
})