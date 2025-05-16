import { useState } from 'react'
import { Modal, View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, NumberSelector } from '../component'
import ModalWrapper from '../component/ModalWrapper'

export default function ScoreAdjusterModal({ visible, onClose, homeTeam, awayTeam, homeScore, awayScore, onChange, onSetCentrePassHome, onSetCentrePassAway }) {
    const [scoreFor, setHomeScore] = useState(homeScore)
    const [scoreAgainst, setAwayScore] = useState(awayScore)

    return (
        <>
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            title={'Score Adjust'}
        >
            <View style={{display: 'none'}}>
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
            </View>
            <Button 
                label={'Set Centre Pass - Home'} 
                onPress={() => onSetCentrePassHome()} 
            />
            <Button 
                label={'Set Centre Pass - Away'} 
                onPress={() => onSetCentrePassAway()} 
            />
        </ModalWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    teamName: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
})