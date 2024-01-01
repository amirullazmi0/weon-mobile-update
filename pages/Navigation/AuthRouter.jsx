import React, { useState, useEffect, useMemo } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Login';
import Splash from '../Pages/Splash';
import NavBar from './NavBar';

const Stack = createNativeStackNavigator();
const AuthRouter = () => {
    return (
        <>
            <Stack.Navigator >
                <Stack.Screen
                    name="splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </>
    )
}

export default AuthRouter