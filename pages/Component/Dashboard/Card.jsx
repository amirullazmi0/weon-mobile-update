import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import PushNotification from "react-native-push-notification";
import { PermissionsAndroid } from 'react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Card = ({ ss }) => {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const [value3, setValue3] = useState(0)
    const [value4, setValue4] = useState(0)
    const [value5, setValue5] = useState(0)

    const [popUp, setPopUp] = useState(false)
    const [modalName, setModalName] = useState(null)

    const getData = async () => {
        // setToken(await AsyncStorage.getItem('userToken'))
        try {
            const token = await AsyncStorage.getItem('userToken')
            const response = await axios.get(`${base_url}/api/latest`, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            if (response.data) {
                setValue1(response.data.data.value1)
                setValue2(response.data.data.value2)
                setValue3(response.data.data.value3)
                setValue4(response.data.data.value4)
                setValue5(response.data.data.value5)
            }
        } catch (error) {
        }
    }

    const [condition, setCondition] = useState([
        { id: 1, name: "ph", fullName: "pH", from: 7.5, to: 8.5, kondisi: "", ket: "" },
        { id: 2, name: "tds", fullName: "TDS", from: 0, to: 800, kondisi: "", ket: "" },
        { id: 3, name: "suhu", fullName: "Suhu", from: 26, to: 28, kondisi: "", ket: "" },
        { id: 4, name: "sal", fullName: "Salinitas", from: 0.5, to: 45, kondisi: "", ket: "" },
        { id: 5, name: "amo", fullName: "Amonia", from: 0, to: 2, kondisi: "", ket: "" },
    ])

    const renderCondition = () => {
        const rr = "low"
        const nn = "normal"
        const tt = "high"
        for (let i = 0; i < condition.length; i++) {
            if (condition[i].name == "ph") {
                if ((ss != null && ss.value1 < condition[i].from) || (!ss && value1 < condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = rr;
                    newCondition[condition[i].id - 1].ket = "lakukan penambahan kapur dengan dosis 2 - 5 ppm hingga nilai pH mencapai ≥ 7,5";
                } else if (ss != null && ss.value1 > condition[i].to || (!ss && value1 > condition[i].to)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = tt;
                    newCondition[condition[i].id - 1].ket = "lakukan penambahan molase (sumber karbon) dengan dosis 1 - 2 ppm hingga pH turun mencapai ≤ 8";
                } else if ((ss != null && ss.value1 <= condition[i].to && ss.value1 >= condition[i].from) || (!ss && value1 <= condition[i].to && value1 >= condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = nn;
                    newCondition[condition[i].id - 1].ket = "-";
                }
            }

            if (condition[i].name == "tds") {
                if (ss != null && ss.value2 < condition[i].from || (!ss && value2 < condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = rr;
                    newCondition[condition[i].id - 1].ket = "Cek Kembali Kalibrasi Alat , TDS tidak mungkin 0";
                } else if (ss != null && ss.value2 > condition[i].to || (!ss && value2 > condition[i].to)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = tt;
                    newCondition[condition[i].id - 1].ket = "lakukan penambahan air baru sebanyak lebih dari 40% atau penggantian air baru)";

                } else if ((ss != null && ss.value2 <= condition[i].to && ss.value2 >= condition[i].from) || (!ss && value2 <= condition[i].to && value2 >= condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = nn;
                    newCondition[condition[i].id - 1].ket = "-";
                }
            }

            if (condition[i].name == "suhu") {
                if (ss != null && ss.value3 < condition[i].from || (!ss && value3 < condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = rr;
                    newCondition[condition[i].id - 1].ket = "Stabilkan suhu ruangan dengan rentang 26 - 28 Celcius";
                } else if (ss != null && ss.value3 > condition[i].to || (!ss && value3 > condition[i].to)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = tt;
                    newCondition[condition[i].id - 1].ket = "Stabilkan suhu ruangan dengan rentang 26 - 28 Celcius";
                } else if ((ss != null && ss.value3 <= condition[i].to && ss.value3 >= condition[i].from) || (!ss && value3 <= condition[i].to && value3 >= condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = nn;
                    newCondition[condition[i].id - 1].ket = "-";
                }
            }

            if (condition[i].name == "sal") {
                if (ss != null && ss.value4 < condition[i].from || (!ss && value4 < condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = rr;
                    newCondition[condition[i].id - 1].ket = "lakukan penambahan garam sebesar 1,5% dari total air kolam";
                } else if (ss != null && ss.value4 > condition[i].to || (!ss && value4 > condition[i].to)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = tt;
                    newCondition[condition[i].id - 1].ket = "dilakukan penambahan air setinggi batas air awal sebelum menguap ";
                } else if ((ss != null && ss.value4 <= condition[i].to && ss.value4 >= condition[i].from) || (!ss && value4 <= condition[i].to && value4 >= condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = nn;
                    newCondition[condition[i].id - 1].ket = "-";
                }
            }

            if (condition[i].name == "amo") {
                if (ss != null && ss.value5 < condition[i].from || (!ss && value5 < condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = rr;
                    newCondition[condition[i].id - 1].ket = "dilakukan penambahan kecepatan aerasi > 0,5 kali dengan pemberian sumber Carbon molase 5% dari total pakan harian";
                } else if (ss != null && ss.value5 > condition[i].to || (!ss && value5 > condition[i].to)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = tt;
                    newCondition[condition[i].id - 1].ket = "dilakukan dengan peningkatan aerasi (pengadukkan > 0,5 kali, pada pH kurang dari 6,5, akan tetapi ketika pH >6,5 maka tidak perlau dilakukan pengadukkan, dengan tetap dipantau pertambahan amonianya)";
                } else if ((ss != null && ss.value5 <= condition[i].to && ss.value5 >= condition[i].from) || (!ss && value5 <= condition[i].to && value5 >= condition[i].from)) {
                    const newCondition = [...condition];
                    newCondition[condition[i].id - 1].kondisi = nn;
                    newCondition[condition[i].id - 1].ket = "-";
                }
            }
        }
    }

    const handlePop = (e) => {
        setModalName(e)
        setPopUp(true)
    }

    const renderPopUp = () => {
        for (let i = 0; i < condition.length; i++) {
            if ((condition[i].name == modalName) && popUp == true) {
                return (
                    <>
                        <View style={styles.viewPopUp}>
                            <View style={styles.itemPopUp}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <TouchableOpacity onPress={() => setPopUp(false)}>
                                        <MaterialCommunityIcons
                                            name="close"
                                            color="#000000"
                                            size={25}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: "40%" }}>
                                        <Text >Name</Text>
                                    </View>
                                    <View style={{ width: "5%" }}>
                                        <Text >:</Text>
                                    </View>
                                    <View style={{ width: "55%" }}>
                                        <Text >{condition[i].fullName}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: "40%" }}>
                                        <Text >Condition</Text>
                                    </View>
                                    <View style={{ width: "5%" }}>
                                        <Text >:</Text>
                                    </View>
                                    <View style={{ width: "55%", backgroundColor: '#00A6FB', padding: 5, borderRadius: 5 }}>
                                        <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>{condition[i].kondisi}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: "40%" }}>
                                        <Text >Action</Text>
                                    </View>
                                    <View style={{ width: "5%" }}>
                                        <Text >:</Text>
                                    </View>
                                    <View style={{ width: "55%" }}>
                                        <Text style={{ textTransform: 'capitalize' }}>{condition[i].ket}</Text>
                                    </View>
                                </View>
                            </View>
                        </View >
                    </>
                )
            }
        }
    }

    async function userPermission() {
        const setting = await messaging().requestPermission()

        console.log(setting);
    }

    useEffect(() => {
        getData()
        userPermission()

        messaging().onMessage(
            async remoteMassage => {
                console.log(remoteMassage);
            }
        )
        messaging().setBackgroundMessageHandler(
            async remoteMassage => {
                console.log(remoteMassage);
            }
        )
        messaging().onNotificationOpenedApp(
            remoteMassage => {
                console.log(remoteMassage);
            }
        )
        messaging().getToken().then(
            token => {
                console.log('token : ', token);
            }
        )
        messaging().onTokenRefresh(
            token => {
                console.log('token refress', token);
            }
        )

    }, [ss.value1])

    return (
        <>
            {/* PH */}
            {renderPopUp()}
            {renderCondition()}
            <View style={styles.viewSensor}>
                <View style={styles.viewCard}>
                    <Text style={styles.textCard}>
                        {ss ?
                            ss.value1
                            : value1 ? value1 : <ActivityIndicator size={20} color={"black"} />}
                    </Text>
                    <TouchableOpacity onPress={() => handlePop('ph')} style={styles.viewGround}>
                        {condition[0].kondisi != 'normal' &&
                            <View style={styles.notif}></View>
                        }
                        <MaterialCommunityIcons
                            name="water"
                            color="#000000"
                            size={25}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginBottom: 30, color: '#006494' }}>pH</Text>
                </View>

                {/* TDS */}
                <View style={styles.viewCard}>
                    <Text style={styles.textCard}>
                        {ss ?
                            ss.value2
                            : value2 ? value2 : <ActivityIndicator size={20} color={"black"} />}
                    </Text>
                    <TouchableOpacity onPress={() => handlePop('tds')} style={styles.viewGround}>
                        {condition[1].kondisi != 'normal' &&
                            <View style={styles.notif}></View>
                        }
                        <MaterialCommunityIcons
                            name="grain"
                            color="#000000"
                            size={25}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginBottom: 30, color: '#006494' }}>PPM</Text>
                </View>

                {/* SUHU */}
                <View style={styles.viewCard}>
                    <Text style={styles.textCard}>
                        {ss ?
                            ss.value3
                            : value3 ? value3 : <ActivityIndicator size={20} color={"black"} />}
                    </Text>
                    <TouchableOpacity onPress={() => handlePop('suhu')} style={styles.viewGround}>
                        {condition[2].kondisi != 'normal' &&
                            <View style={styles.notif}></View>
                        }
                        <MaterialCommunityIcons
                            name="snowflake"
                            color="#000000"
                            size={25}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginBottom: 30, color: '#006494' }}>Celcius</Text>
                </View>

                {/* SALINITAS */}
                <View style={styles.viewCard}>
                    <Text style={styles.textCard}>
                        {ss ?
                            ss.value4
                            : value4 ? value4 : <ActivityIndicator size={20} color={"black"} />}
                    </Text>
                    <TouchableOpacity onPress={() => handlePop('sal')} style={styles.viewGround}>
                        {condition[3].kondisi != 'normal' &&
                            <View style={styles.notif}></View>
                        }
                        <MaterialCommunityIcons
                            name="flash"
                            color="#000000"
                            size={25}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginBottom: 30, color: '#006494' }}>PPT</Text>
                </View>

                {/* AMONIA */}
                <View style={styles.viewCard}>
                    <Text style={styles.textCard}>
                        {ss ?
                            ss.value5
                            : value5 ? value5 : <ActivityIndicator size={20} color={"black"} />}
                    </Text>
                    <TouchableOpacity onPress={() => handlePop('amo')} style={styles.viewGround}>
                        {condition[4].kondisi != 'normal' &&
                            <View style={styles.notif}></View>
                        }
                        <MaterialCommunityIcons
                            name="weather-windy"
                            color="#000000"
                            size={25}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginBottom: 30, color: '#006494' }}>mg/L</Text>
                </View>
            </View>
        </>
    )
}

export default Card

const styles = StyleSheet.create({
    viewCard: {
        // padding: 10,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 150,
        width: 150,
        zIndex: 5,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        elevation: 5,
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
    viewGround: {
        // padding: 10,
        // backgroundColor: '#FFD60A',
        backgroundColor: '#FFFFFF',
        marginBottom: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        // borderRadius: 20,
        borderTopLeftRadius: 17,
        borderBottomRightRadius: 17,
        zIndex: 5,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    textGround: {
        textAlign: 'center',
        color: '#edf2fb',
        marginTop: 'auto',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textCard: {
        textAlign: 'center',
        position: 'absolute',
        color: '#006494',
        fontSize: 25,
        fontWeight: 'bold'
    },
    notif: {
        backgroundColor: '#FFC300',
        height: 13,
        width: 13,
        borderRadius: 20,
        position: 'absolute',
        zIndex: 20,
        top: -2,
        left: -2
    },
    viewPopUp: {
        position: 'absolute',
        top: -10,
        // backgroundColor: '#00001D3D',
        zIndex: 20,
        width: '100%',
        // height: '100%',
        flexDirection: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemPopUp: {
        padding: 20,
        // top: -200,
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap: 15,
        elevation: 100
    }
})