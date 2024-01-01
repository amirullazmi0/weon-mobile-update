import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import Header from '../Component/Dashboard/Header';
import Graph from '../Component/Dashboard/Graph';
import Card from '../Component/Dashboard/Card';
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation/AuthContext';
import ChartRealTimepH from '../Component/Dashboard/ChartRealTimepH';


export default function Dashboard() {
    const pusher = Pusher.getInstance();

    const [iniSocket, setSocket] = useState(0)
    const [connection, setConnection] = useState(false)
    const [allSensor, setAllSensor] = useState(null)
    const { signOut } = useContext(AuthContext)

    const renderSocket = async () => {
        const pusher = Pusher.getInstance();
        pusher.init({
            apiKey: "45d39f4664c31a6e0645",
            cluster: "ap1",
        });

        pusher.connect();

        try {
            pusher.subscribe({
                channelName: "Sensor-Event",
                onEvent: (event: PusherEvent) => {
                    const jj = JSON.parse(event.data)
                    // console.log('Socket', jj);
                    setSocket(jj.message);
                    setConnection(true)
                    AsyncStorage.setItem('socket', JSON.stringify(jj.message))
                }
            });
        } catch (error) {
            setConnection(false)
        }
    }
    const connectToWebSocket = async () => {
        const isWebSocketConnected = await AsyncStorage.getItem("isWebSocketConnected");
        if (!isWebSocketConnected || isWebSocketConnected == "false") {
            await renderSocket();
            await AsyncStorage.setItem("isWebSocketConnected", "false");
        }
    }
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        connectToWebSocket();
        renderSocket();
    }, []);


    const onRefresh = React.useCallback(() => {
        renderSocket();
        connectToWebSocket();
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [refreshing]);
    return (
        <>
            <View style={styles.viewMain}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <Header reload={connectToWebSocket} connect={connection} />
                    <View style={styles.viewScroll}>
                        <Card ss={iniSocket} />
                        <ChartRealTimepH />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    body: {
        // backgroundColor: '#00A6FB',
        backgroundColor: '#00A6FB',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 0,
    },
    viewMain: {
        paddingTop: 0,
        height: '100%',
        backgroundColor: '#00A6FB',
        paddingLeft: 0,
        paddingRight: 0,
    },
    viewScroll: {
        // padding: 10,
        flexDirection: 'column',
        backgroundColor: '#00A6FB',
        height: '100%',
    },
    viewSensor: {
        flexDirection: 'row',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: -80,
        marginBottom: 20,
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
        gap: 10,
    },
    viewGraph: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        marginTop: 10,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // backgroundColor: '#fefcfb',
        // backgroundColor: '#003554',
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 10,
    },
    btnLogin: {
        backgroundColor: '#FFC300',
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        width: '50%',
        alignItems: 'center',
    },
    btnText: {
        color: '#ffffff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
    },
})