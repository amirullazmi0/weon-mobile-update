import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Animated, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
// import { LineChart } from 'react-native-gifted-charts'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { LineChart } from "react-native-chart-kit";
import axios from 'axios';

const Graph = () => {
    const [Loading, setLoading] = useState(true)


    useEffect(() => {
        // getItem()
    })

    const [nav, setNav] = useState('hourly')
    const HandleNav = (e) => {
        setNav(e)
    }
    return (
        <>

        </>
    )
}


export default Graph

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    contentContainer: {
        flexGrow: 1,
    },
    chartContainer: {
        width: 1000,
        height: 300,
        // You can add more styling here as needed
    },
    nav: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        elevation: 2,
        borderRadius: 10,
        gap: 5,
    },
    navItem: {
        backgroundColor: '#ebebeb',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    navItemActive: {
        backgroundColor: '#003566',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    textItem: {
        color: '#8b8c89'
    },
    textItemActive: {
        color: '#FFFFFF'
    },
})