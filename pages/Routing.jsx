import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Router from './Navigation/Router'
import AuthRouter from './Navigation/AuthRouter'
import { AuthContext } from './Navigation/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

export default function Routing() {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const [userToken, setUserToken] = useState(null)
    const deleteToken = async () => {
        const token = await AsyncStorage.getItem('userToken', token);
        if (token) {
            try {
                const response = await axios.post(`${base_url}/api/logout`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                });
                response()
            } catch (error) {
            }
        }
        await AsyncStorage.removeItem('userToken')
        setUserToken(null)
    }
    const authContext = useMemo(() => ({
        signIn: ({ token }) => {
            setUserToken(token)
        },
        signOut: () => {
            deleteToken()
        }
    }))

    return (
        <>
            {/* <View>
                <Text>Routing</Text>
            </View> */}
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {userToken ?
                        <Router />
                        // <View><Text>token</Text></View>
                        :
                        // <View><Text>Tidak Ada token</Text></View>
                        <AuthRouter />
                    }
                </NavigationContainer >
            </AuthContext.Provider>
        </>
    )
}

const styles = StyleSheet.create({})