import Menu from '@/screens/Menu';
import TicTacToe1 from '@/screens/TicTacToe1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootParamsList } from './type.routes';


const Stack = createNativeStackNavigator<RootParamsList>()
const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Menu' component={Menu} />
                <Stack.Screen name='TicTacToe1' component={TicTacToe1} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;