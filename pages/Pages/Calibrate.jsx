import {
    View,
    StyleSheet,
    ScrollView,
    Text
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import Card from '../Component/Calibrate/Card';
import Header from '../Component/Calibrate/Header';

export default function Calibrate() {
    const [refreshing, setRefreshing] = useState(false);
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    return (
        <View style={styles.body}>
            <ScrollView
                style={styles.viewScroll}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
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