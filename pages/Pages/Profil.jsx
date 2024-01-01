import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import Card from '../Component/Profil/Card';
import Header from '../Component/Profil/Header';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation/AuthContext';
// import { base_url } from 'react-native-dotenv';
export default function Profil() {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const [refreshing, setRefreshing] = useState(false);
    const { signIn } = useContext(AuthContext)
    const { signOut } = useContext(AuthContext)
    const [user, setUser] = useState(null)

    const onRefresh = React.useCallback(() => {
        getItem();
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    });
    return (
        <View style={styles.body}>
            <ScrollView
                style={styles.viewScroll}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <Header />
                <View style={styles.viewMain}>
                    <Card />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        // backgroundColor: '#00A6FB',
        // backgroundColor: '#edf2fb',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 0,
    },
    viewScroll: {
        width: '100%',
        // height: '90%',
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