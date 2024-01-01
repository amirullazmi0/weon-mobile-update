import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext, useEffect, useMemo, ActivityIndicator } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavBar from './NavBar';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="myNav"
                    component={NavBar}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </>
    )
}

export default Router

const styles = StyleSheet.create({})