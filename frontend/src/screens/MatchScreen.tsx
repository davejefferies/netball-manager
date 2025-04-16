import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, LayoutChangeEvent, Modal, FlatList, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import NetballButton from '../component/NetballButton'
import { fetchStatTypes } from '../api/statApi'
import { fetchSportPositions } from '../api/sportApi'
import { useModal } from '../context/ModalContext'

const MATCH_DURATION = 10 * 60

const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android'

type Stat = {
    code: string
    name: string
    always?: boolean
}

type Position = {
    id: number
    code: string
    playerId: number
    playerName: string
}

const MatchScreen: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [goodStats, setGoodStats] = useState<Stat[]>([])
    const [badStats, setBadStats] = useState<Stat[]>([])
    const [homeScore, setHomeScore] = useState(0)
    const [awayScore, setAwayScore] = useState(0)
    const [quarter, setQuarter] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [remainingSeconds, setRemainingSeconds] = useState(MATCH_DURATION)
    const [possession, setPossession] = useState<'home' | 'opponent'>('home')
    const [measuredContentWidth, setMeasuredContentWidth] = useState<number>(0)
    const [measuredContentHeight, setMeasuredContentHeight] = useState<number>(0)
    const [ballWidth, setBallWidth] = useState<number>(0)
    const [selectedPosition, setSelectedPosition] = useState<number>(0)
    const [positions, setPositions] = useState<Position[]>([])
    const [players, setPlayers] = useState([])

    const { openModal, closeModal } = useModal()

    const route = useRoute()
    const { team, event } = route.params

    const intervalRef: any = useRef<NodeJS.Timer | null>(null);

    const togglePlay = () => {
        if (isPlaying)
            openModal('pauseMatch', {
                onPause: () => () => {
                    setIsPlaying(false)
                    closeModal()
                },
                onQuarterEnd: () => {
                    setIsPlaying(false)
                    setRemainingSeconds(MATCH_DURATION)
                    setQuarter(quarter + 1)
                    closeModal()
                },
                onGameEnd: () => {}
            })
        else
            setIsPlaying(prev => !prev)
    }

    useEffect(() => {
        if (isPlaying && remainingSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setRemainingSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    setIsPlaying(false);
                    Alert.alert('Quarter Finished', 'Time is up!');
                    return 0;
                }
                return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying]);

    const loadStatTypes = async () => {
        try {
            const { data } = await fetchStatTypes()
            if (data) {
                setGoodStats(data.filter((item: any) => item.good))
                setBadStats(data.filter((item: any) => !item.good))
            }
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

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
            loadStatTypes()
            loadPositions()
            if (team && team.members) {
                setPlayers(team.members)
            } else {
                setPlayers([])
            }
        }, [])
    )

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    const handleLayout = (e: LayoutChangeEvent) => {
        if (!measuredContentWidth) {
            const w = e.nativeEvent.layout.width
            setMeasuredContentWidth(w)
            let bW = w * 0.09
            if (bW < 50) bW = 50
            setBallWidth(bW)
        }
        if (!measuredContentHeight) {
            const h = e.nativeEvent.layout.height
            setMeasuredContentHeight(h)
        }
    }

    const setScore = (home: number, away: number) => {
        setHomeScore(home)
        setAwayScore(away)
        closeModal()
    }

    return (
        <View style={isWeb ? styles.container : ''}>
            <View style={isWeb ? styles.box : ''}>
                <View style={styles.topBar}>
                    <View
                        style={[
                            styles.teamBlock,
                            possession === 'home' && styles.possessionBlock
                        ]}
                    >
                        <Text style={styles.teamName}>{team.name}</Text>
                        <Pressable onPress={() => openModal('scoreAdjuster', {
                            homeTeam: team.name,
                            awayTeam: event.opponent,
                            homeScore,
                            awayScore: awayScore,
                            onChange: setScore,
                            onChangeCentrePass: () => {}
                        })}>
                            <Text style={styles.score}>{homeScore}</Text>
                        </Pressable>
                    </View>
                    <View
                        style={[
                            styles.teamBlock,
                            possession === 'opponent' && styles.possessionBlock
                        ]}
                    >
                        <Pressable onPress={() => openModal('scoreAdjuster', {
                            homeTeam: team.name,
                            awayTeam: event.opponent,
                            homeScore,
                            awayScore: awayScore,
                            onChange: setScore,
                            onChangeCentrePass: () => {}
                        })}>
                            <Text style={styles.score}>{awayScore}</Text>
                        </Pressable>
                        <Text style={[styles.teamName, styles.teamAwayName]}>{event.opponent}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={[styles.column, styles.columnFixed]}>
                        {goodStats.map((stat: Stat) => 
                            <TouchableOpacity
                            key={stat.code}
                            style={[styles.statButton, {flex: 1, opacity: (!selectedPosition && !stat.always ? 0.4 : 1)}]}
                            onPress={() => console.log('Goal pressed')}
                            disabled={!selectedPosition && !stat.always}
                        >
                            <Text style={styles.statButtonCode}>{stat.code}</Text>
                            <Text style={styles.statButtonName}>{stat.name}</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.column, styles.columnGrow]}>
                        <View style={[styles.contentGoal]}>
                            <View style={[styles.goalBlock, {height: 35}]}>
                                <View style={{ flexDirection:'row' }}>
                                    <TouchableOpacity style={styles.goalButton}>
                                        <Text>GOAL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.missButton}>
                                        <Text>MISS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.goalBlock, {height: 35}]}>
                                <View style={{ flexDirection:'row' }}>
                                    <TouchableOpacity style={styles.goalButton}>
                                        <Text>GOAL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.contentPositions]} onLayout={handleLayout}>
                            {positions.map(position => 
                                <NetballButton 
                                    key={position.code}
                                    label={position.code}
                                    name={position.playerName}
                                    style={{
                                        left: eval(position.left),
                                        top: eval(position.top),
                                        bottom: eval(position.bottom),
                                        right: eval(position.right),
                                        position: 'absolute'
                                    }}
                                    size={ballWidth}
                                    onPress={() => {
                                        if (position.id === selectedPosition)
                                            return setSelectedPosition(0)
                                        setSelectedPosition(position.id)
                                    }}
                                    onLongPress={() => openModal('assignPlayer', {
                                        positionCode: position.code,
                                        players: players,
                                        onAssign: (player: any) => 
                                            setPositions(prev => 
                                                prev.map(pos => 
                                                    pos.id === position.id ? { ...pos, playerId: player.id, playerName: player.name } : pos))
                                    })}
                                    disabled={ position.id === selectedPosition }
                                />
                            )}
                        </View>
                    </View>
                    <View style={[styles.column, styles.columnFixed]}>
                        {badStats.map((stat: Stat) => 
                            <TouchableOpacity
                                key={stat.code}
                                style={[styles.statButton, styles.statButtonRed, {flex: 1, opacity: (!selectedPosition && !stat.always ? 0.4 : 1)}]}
                                onPress={() => console.log('Goal pressed')}
                                disabled={!selectedPosition && !stat.always}
                            >
                                <Text style={styles.statButtonCode}>{stat.code}</Text>
                                <Text style={styles.statButtonName}>{stat.name}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>

                    <TouchableOpacity onPress={togglePlay} style={styles.controlButton}>
                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => {
                            if (intervalRef.current) clearInterval(intervalRef.current);
                            setRemainingSeconds(MATCH_DURATION);
                            setIsPlaying(false);
                        }}
                    >
                        <Ionicons name="arrow-undo" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.quarter}>Quarter: {quarter}</Text>
                </View>
            </View>
        </View>
    );
};

export default MatchScreen;

const styles = StyleSheet.create({
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
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#f0f0f0'
    },
    teamBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexGrow: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: '50%'
    },
    teamAwayName: {
        justifyContent: 'flex-end',
        textAlign: 'right'
    },
    teamName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        flexGrow: 1
    },
    score: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000'
    },
    possessionBlock: {
        backgroundColor: '#51cf66',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    contentGoal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 35,
        minHeight: 35,
        maxHeight: 35
    },
    contentPositions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        height: '100%'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    columnFixed: {
        width: '15%',
        minWidth: '15%',
        maxWidth: '15%'
    },
    columnGrow: {
        flexGrow: 1
    },
    halfCircle: {
        width: '80%',
        height: 100,
        backgroundColor: '#1c7ed6',
        alignSelf: 'center',
        display: 'none'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    timer: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    controlButton: {
        padding: 10,
        borderRadius: 30,
        color: '#000'
    },
    quarter: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    statButton: {
        backgroundColor: '#51cf66',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    statButtonRed: {
        backgroundColor: '#fc0f03'
    },
    statButtonCode: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    statButtonName: {
        color: '#000',
        textAlign: 'center'
    },
    goalBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        flexGrow: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: '50%'
    },
    goalButton: {
        backgroundColor: '#808080',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold'
    },
    missButton: {
        backgroundColor: '#808080',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        marginLeft: 10
    }
});
  