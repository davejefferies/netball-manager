import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TeamScreen from '../screens/TeamScreen'
import ModifyTeamScreen from '../screens/ModifyTeamScreen'
import EventScreen from '../screens/EventScreen'
import TrainingDetailScreen from '../screens/TrainingDetailScreen'
import MatchScreen from '../screens/MatchScreen'
import ModifyEventScreen from '../screens/ModifyEventScreen'
import ModifyTrainingScreen from '../screens/ModifyTrainingScreen'

const Stack = createNativeStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Teams" component={TeamScreen} />
            <Stack.Screen name="ModifyTeam" component={ModifyTeamScreen} />
            <Stack.Screen name="Events" component={EventScreen} />
            <Stack.Screen name="ModifyEvent" component={ModifyEventScreen} />
            <Stack.Screen name="TrainingDetail" component={TrainingDetailScreen} />
            <Stack.Screen name="ModifyTraining" component={ModifyTrainingScreen} />
            <Stack.Screen name="Match" component={MatchScreen} />
        </Stack.Navigator>
      )
}
