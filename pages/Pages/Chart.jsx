import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Animated, TouchableOpacity, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
// import { ratarata_url } from 'react-native-dotenv';
import ChartRatarata from "../Component/Chart/ChartRatarata";
import ChartDaily from '../Component/Chart/ChartDaily';
import ChartWeekly from '../Component/Chart/ChartWeekly';
import ChartMonthly from '../Component/Chart/ChartMonthly';

export default function Chart() {
    const [refreshing, setRefreshing] = useState(false);
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [refreshing]);

    return (
        <ScrollView style={styles.viewBody}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <ChartRatarata
                title={'Hourly Chart'}
                api={`${ratarata_url}/api/iot/average/hour`}
            />
            <ChartDaily
                title={'Daily Chart'}
                api={`${ratarata_url}/api/iot/average/month`}
            />
            <ChartWeekly
                title={'Weekly Chart'}
                api={`${ratarata_url}/api/iot/average/week`}
            />
            <ChartMonthly
                title={'Monthly Chart'}
                api={`${ratarata_url}/api/iot/average/year`}
            />
            <View style={{ margin: 20 }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        height: '100%',
        flexDirection: 'column',
        // backgroundColor: '#00A6FB',
        backgroundColor: '#00A6FB',
        padding: 20,
        paddingBottom: 20,
    },
    viewItem: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 20,
        width: '100%',
        marginBottom: 20,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        padding: 20
    },
    nav: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        elevation: 2,
        borderRadius: 20,
        rowGap: 10,
        zIndex: 10,
        gap: 10,
        marginBottom: 20,
    },
    navItem: {
        backgroundColor: '#ebebeb',
        padding: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        width: 100,
        marginLeft: 5,
        marginRight: 5,
    },
    navItemActive: {
        backgroundColor: '#FFD60A',
        zIndex: 20,
        elevation: 2,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        width: 100
    },
    textItem: {
        color: '#8b8c89',
        textAlign: 'center'
    },
    textItemActive: {
        color: '#000000',
        textAlign: 'center'
    },
    viewLoading: {
        width: '100%',
        height: 200,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})