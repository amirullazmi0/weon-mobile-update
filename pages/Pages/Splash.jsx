import { Text, StyleSheet, View, Image, StatusBar } from 'react-native'
import React, { Component, useEffect, useContext, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../Navigation/AuthContext'
// import { base_url } from 'react-native-dotenv';
const Splash = ({ navigation }) => {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const { signIn } = useContext(AuthContext)
    const { signOut } = useContext(AuthContext)
    const [login, setLogin] = useState(null)
    const authToken = async () => {
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
            setTimeout(() => {
                signOut()
                setLogin(false)
                // navigation.replace("login")
            }, 1000)
        } else {

            try {
                const response = await axios.get(`${base_url}/api/auth`, {
                    headers: {
                        'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                        'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                        // Tambahkan header lain sesuai kebutuhan Anda
                    }
                });
                if (response.data.success == true) {
                    signIn({ token: token })
                } else {
                    signOut()
                    setLogin(false)
                    // navigation.replace("login")
                }
            } catch (error) {
                signOut()
                setLogin(false)
                // navigation.replace("login")
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            authToken()
            if (login == false) {
                navigation.replace("login")
            }
        }, 1000)
        authToken()
    }, [login])

    return (
        <>
            <StatusBar backgroundColor="#FFFFFF" />
            <View style={styles.viewSplash}>
                <Image style={styles.imgLogo} source={require('../img/weon.png')} />
                {/* <Text style={styles.brandLogo}>WEon-e</Text> */}
            </View>
        </>
    )
}

export default Splash

const styles = StyleSheet.create({
    viewSplash: {
        height: "100%",
        width: "100%",
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgLogo: {
        height: 130,
        width: 130,
    },
    brandLogo: {
        fontSize: 50,
        marginLeft: 10,
        fontWeight: 'bold',
    },
})