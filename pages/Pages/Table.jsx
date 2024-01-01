import { Text, StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import React, { Component, useState, useEffect, useContext, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../Navigation/AuthContext'
import Header from '../Component/Table/Header'
import Card from '../Component/Table/Card'
// import { base_url } from 'react-native-dotenv';
export default function Table() {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const [refreshing, setRefreshing] = useState(false);
    const [dataSensor, setDataSensor] = useState(null);

    const getItem = async () => {
        const token = await AsyncStorage.getItem('userToken');
        try {
            const response = await axios.get(`${base_url}/api/sensor`, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            setDataSensor(response.data.data.sensor)
            // console.log(response.data.data);
        } catch (error) {

        }
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getItem()
    }, []);

    const scrollViewRef = useRef();

    const scrollToTop = () => {
        // Anda dapat menggunakan referensi untuk mengakses ScrollView
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };
    useEffect(() => {
        getItem()
    }, [])
    return (
        <View style={styles.body}>
            <ScrollView
                style={styles.viewScroll}
                ref={scrollViewRef}
                refreshControl={
                    < RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <Header />
                <View style={styles.viewMain}>
                    <Card scroll={scrollToTop} data={dataSensor} />
                    {/* <Text>table</Text> */}
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    body: {
        // backgroundColor: '#00A6FB',
        // backgroundColor: '#edf2fb',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 0,
    },
    viewScroll: {
        width: '100%',
    },
    viewMain: {
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 7,
        height: '100%',
        width: '100%',
    },
})