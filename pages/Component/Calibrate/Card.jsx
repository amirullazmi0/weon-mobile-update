import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Pusher } from '@pusher/pusher-websocket-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const Card = () => {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const [calibrate, setCalibrate] = useState('ph')
    const [jumlah, setJumlah] = useState(3)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [xy, setXY] = useState(0)
    const [x2, setX2] = useState(0)
    const [y2, setY2] = useState(0)
    const [a, setA] = useState()
    const [b, setB] = useState()
    const [rumus, setRumus] = useState(false)
    const [iniNotif, setIniNotif] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const [value, setValue] = useState([
        { id: 1, real: 0, analog: 0 },
        { id: 2, real: 0, analog: 0 },
        { id: 3, real: 0, analog: 0 },
        { id: 4, real: 0, analog: 0 },
        { id: 5, real: 0, analog: 0 },
        { id: 6, real: 0, analog: 0 },
        { id: 7, real: 0, analog: 0 },
        { id: 8, real: 0, analog: 0 },
        { id: 9, real: 0, analog: 0 },
        { id: 10, real: 0, analog: 0 },
        { id: 11, real: 0, analog: 0 },
        { id: 12, real: 0, analog: 0 },
        { id: 13, real: 0, analog: 0 },
        { id: 14, real: 0, analog: 0 },
        { id: 15, real: 0, analog: 0 },
    ])
    // const [analog, setAnalog] = useState[[]]

    const [wew, setWew] = useState('')

    const HandleSubmitQuality = async (e) => {
        const label = calibrate
        const dataFromAsync = await AsyncStorage.getItem('socket')

        if (label == 'ph') {
            const data = JSON.parse(dataFromAsync).aPH
            setWew(parseFloat(data))
        }
        if (label == 'tds') {
            const data = JSON.parse(dataFromAsync).aTDS
            setWew(parseFloat(data))
        }
        if (label == 'suhu') {
            const data = JSON.parse(dataFromAsync).aSUHU
            setWew(parseFloat(data))
        }
        if (label == 'sal') {
            const data = JSON.parse(dataFromAsync).aSAL
            setWew(parseFloat(data))
        }
        if (label == 'amo') {
            const data = JSON.parse(dataFromAsync).aAMO
            setWew(parseFloat(data))
        }
        const updatedValue = value.map(item => {
            if (item.id === e) {
                return { ...item, analog: wew };
            }
            return item;
        });

        setValue(updatedValue);
    }

    const handleInputChange = (e, id) => {
        const vv = parseFloat(e)
        const updatedValue = value.map(item => {
            if (item.id == id) {
                return { ...item, real: vv };
            }
            return item;
        });

        setValue(updatedValue);
    }

    const handleNav = (e) => {
        setCalibrate(e)
        setValue([
            { id: 1, real: 0, analog: 0 },
            { id: 2, real: 0, analog: 0 },
            { id: 3, real: 0, analog: 0 },
            { id: 4, real: 0, analog: 0 },
            { id: 5, real: 0, analog: 0 },
            { id: 6, real: 0, analog: 0 },
            { id: 7, real: 0, analog: 0 },
            { id: 8, real: 0, analog: 0 },
            { id: 9, real: 0, analog: 0 },
            { id: 10, real: 0, analog: 0 },
            { id: 11, real: 0, analog: 0 },
            { id: 12, real: 0, analog: 0 },
            { id: 13, real: 0, analog: 0 },
            { id: 14, real: 0, analog: 0 },
            { id: 15, real: 0, analog: 0 },
        ])
        setX(0)
        setY(0)
        setXY(0)
        setX2(0)
        setY2(0)
        setA(0)
        setB(0)
    }

    const handleTambah = (e) => {
        setJumlah(jumlah + 1)
    }
    const handleKurang = () => {
        const updatedValue = value.map(item => {
            if (item.id === jumlah) {
                return { ...item, real: '', analog: '' };
            }
            return item;
        });

        setValue(updatedValue);
        setJumlah(jumlah - 1)
    }

    const renderJumlah = () => {
        const formm = []
        for (let i = 0; i < jumlah; i++) {
            formm.push(
                <View key={i} style={styles.viewForm}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                        <Text style={{ marginRight: 20, }}>{i + 1} </Text>
                        <TextInput
                            placeholder='Current Value'
                            style={styles.textInput}
                            keyboardType='decimal-pad'
                            onChangeText={(e) => handleInputChange(e, i + 1)}
                        />
                        {value[i].analog ?
                            <View style={styles.viewDataCalibrate}>
                                <Text style={{ fontSize: 18, color: '#000000' }}>{value[i].analog}</Text>
                            </View> : null}
                        <TouchableOpacity
                            style={styles.btnCheck}
                            onPress={() => HandleSubmitQuality(i + 1)}
                        >
                            <MaterialCommunityIcons
                                name="check"
                                color="#000000"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return formm
    }

    const handleCalibrate = () => {
        let totalx = 0;
        let totaly = 0;
        let totalxy = 0;
        let totalx2 = 0;
        let totaly2 = 0;

        for (let i = 0; i < jumlah; i++) {
            totalx += value[i].analog;
            totaly += value[i].real;
            totalxy += value[i].real * value[i].analog;
            totalx2 += value[i].analog * value[i].analog;
            totaly2 += value[i].real * value[i].real;
        }

        setX(totalx)
        setY(totaly)
        setXY(totalxy.toFixed(8))
        setX2(totalx2.toFixed(8))
        setY2(totaly2.toFixed(8))
        setA(((totaly * totalx2 - totalx * totalxy) / (jumlah * totalx2 - Math.pow(totalx, 2))).toFixed(4))
        setB(((jumlah * totalxy - totalx * totaly) / (jumlah * totalx2 - Math.pow(totalx, 2))).toFixed(4))
        setRumus(true)
    }

    const handleNotif = () => {
        setTimeout(() => {
            setIniNotif(false)
        }, 30000)
        return (
            <>
                <View style={iniNotif == true ? { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' } : { display: 'none' }} >
                    <View style={styles.viewAlert}>
                        <Text style={[styles.textAlert, { marginRight: 10 }]}>Update Success</Text>
                        <MaterialCommunityIcons
                            name="check-circle-outline"
                            color="#000000"
                            size={25}
                        />
                    </View>
                </View >
            </>
        )
    }

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const response = await axios.post(`${base_url}/api/updateCalibrate`, {
                name: calibrate,
                a: a,
                b: b
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            if (response.data.success == true) {
                console.log(response.data);
                setIniNotif(true)
            } else {

            }
        } catch (error) {
            // console.error(error);
        }
    }
    return (
        <>
            <View style={styles.viewCardNav}>
                <TouchableOpacity
                    style={calibrate == 'ph' ? styles.viewNavActive : styles.viewNavItem}
                    onPress={() => handleNav('ph')}
                >
                    <Text style={styles.textNav}>pH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={calibrate == 'tds' ? styles.viewNavActive : styles.viewNavItem}
                    onPress={() => handleNav('tds')}>
                    <Text style={styles.textNav}>TDS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={calibrate == 'suhu' ? styles.viewNavActive : styles.viewNavItem}
                    onPress={() => handleNav('suhu')}>
                    <Text style={styles.textNav}>Therm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={calibrate == 'sal' ? styles.viewNavActive : styles.viewNavItem}
                    onPress={() => handleNav('sal')}>
                    <Text style={styles.textNav}>Sal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={calibrate == 'amo' ? styles.viewNavActive : styles.viewNavItem}
                    onPress={() => handleNav('amo')}>
                    <Text style={styles.textNav}>Amo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewCard}>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: "#000000" }}>Form Calibration</Text>
                    {handleNotif()}
                </View>
                {renderJumlah()}
                <View style={styles.viewJumlah}>
                    {jumlah <= 3 ? null :
                        <TouchableOpacity
                            style={styles.viewJumlahItem}
                            onPress={() => handleKurang()}
                        >
                            <MaterialCommunityIcons
                                name="minus"
                                color="#000000"
                                size={25}
                            />
                        </TouchableOpacity>
                    }
                    {jumlah >= 15 ? null :
                        <TouchableOpacity
                            style={styles.viewJumlahItem}
                            onPress={() => handleTambah()}
                        >
                            <MaterialCommunityIcons
                                name="plus"
                                color="#000000"
                                size={25}
                            />
                        </TouchableOpacity>
                    }
                </View>
                {(!isNaN(a) && a !== 0 && b !== 0) ?
                    <>
                        <View style={styles.viewRegretion}>
                            <Text> y = {a} + {b}x</Text>
                        </View>
                    </>
                    : null
                }
                <TouchableOpacity
                    style={styles.btnCalibrate}
                    onPress={() => handleCalibrate()}
                >
                    <Text>Calibrate</Text>
                </TouchableOpacity>
                {(!isNaN(a) && a !== 0 && b !== 0) ?
                    < TouchableOpacity
                        style={styles.btnSave}
                        onPress={() => handleSubmit()}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity> : null}
            </View >
        </>
    )
}

export default Card

const styles = StyleSheet.create({
    viewCardNav: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 20,
        padding: 15,
        paddingLeft: 15,
        paddingRight: 15,
        width: '90%',
        marginBottom: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 2, shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 2,

    },
    viewNavItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 7,
        width: '18%',
        padding: 10,
    },
    viewNavActive: {
        // backgroundColor: '#FFD60A',
        backgroundColor: '#FFFFFF',
        color: '#000814',
        borderRadius: 10,
        width: '18%',
        padding: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
        zIndex: 20,
    },
    viewForm: {
        flexDirection: 'column',
        gap: 10,
    },
    textNav: {
        textAlign: 'center',
        fontSize: 12
    },
    viewCard: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderRadius: 30,
        width: '90%',
        padding: 15,
        gap: 5,
        // height: 450,
        marginBottom: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    viewCardHead: {
        backgroundColor: '#FFD60A',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 20,
        zIndex: 5,
    },
    viewJumlah: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 5,
    },
    viewJumlahItem: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#006494',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
    },
    textGround: {
        textAlign: 'center',
        color: '#979dac',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textCard: {
        textAlign: 'center',
        color: '#006494',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: '#f9f9f9',
        flex: 1,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    btnGrey: {
        backgroundColor: '#e7ecef',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    btnCheck: {
        // backgroundColor: '#FFC300',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    btnCalibrate: {
        // backgroundColor: '#e7ecef',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#006494',
        elevation: 5,
    },
    viewDataCalibrate: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 2,
    },
    viewRegretion: {
        width: '100%',
        backgroundColor: '#a5be00',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        // borderWidth: 1,
        borderRadius: 20,
        shadowColor: '#006494',
        elevation: 5,
    },
    btnSave: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        // borderWidth: 1,
        borderRadius: 10,
        shadowColor: '#006494',
        elevation: 5,
    },
    viewAlert: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        width: 'auto',
        backgroundColor: '#f9f9f9',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    textAlert: {
        textAlign: 'right',
        color: '#000000'
    },
})