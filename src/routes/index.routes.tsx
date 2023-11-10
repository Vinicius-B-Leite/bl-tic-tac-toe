import Menu from '@/screens/Menu';
import TicTacToe1 from '@/screens/TicTacToe1';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootParamsList } from './type.routes';
import { StatusBar } from 'react-native';
import { useTheme } from '@shopify/restyle';
import TicTacToe2 from '@/screens/TicTacToe2';
import Win from '@/screens/Win';


const Stack = createNativeStackNavigator<RootParamsList>()

const Routes: React.FC = () => {
    const theme = useTheme()
    DefaultTheme.colors.background = theme.colors.bg

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={theme.colors.bg} barStyle='light-content' />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Menu' component={Menu} />
                <Stack.Screen name='TicTacToe1' component={TicTacToe1} />
                <Stack.Screen name='TicTacToe2' component={TicTacToe2} />
                <Stack.Screen name='Win' component={Win} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;