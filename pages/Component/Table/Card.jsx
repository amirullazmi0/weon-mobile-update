import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { format, parseISO, differenceInDays } from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const Card = ({ data, scroll }) => {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const jumlah = 20
    const [dataSensor, setDataSensor] = useState(null)
    const [prevNumber, setPrevNumber] = useState(0)
    const [nextNumber, setNextNumber] = useState(1)
    const [modalDelete, setModalDelete] = useState(false)

    const [notif, setNotif] = useState(false)

    const [id, setId] = useState(null)
    const handlePrev = () => {
        if (prevNumber > 0) {
            setNextNumber(nextNumber - 1)
            setPrevNumber(prevNumber - 1)
            scroll()
        }
    }
    const renderNotif = () => {
        setTimeout(() => {
            setNotif(false)
        }, 20000)
        return (
            <>
                {notif == true ?
                    <View style={styles.notif}>
                        <Text>Delete data sensor success</Text>
                        <MaterialCommunityIcons
                            name="check"
                            color="#000000"
                            size={20}
                        />
                    </View> : null
                }
            </>
        )
    }

    const handlNext = () => {
        const jj = data.length
        if ((jj / (jumlah * nextNumber)) >= 1) {
            setNextNumber(nextNumber + 1)
            setPrevNumber(prevNumber + 1)
            scroll()
        }
    }

    const handleDelete = async (e) => {
        setId(e)
        setModalDelete(true)
    }

    const handleSubmitDelete = async () => {
        setModalDelete(false)
        try {
            const token = await AsyncStorage.getItem('userToken')
            const response = await axios.post(`${base_url}/api/deleteSensor`, {
                id: id,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            if (response.data.success == true) {
                setDataSensor(response.data.sensor)
                setNotif(true)
            } else {
                console.log('succese false');
            }
        } catch (error) {

        }
    }

    const renderPopUp = (e) => {
        return (
            <>
                {modalDelete == true ?
                    <View style={styles.viewPopUp}>
                        <View style={styles.itemPopUp}>
                            <View style={{ flexDirection: 'row-reverse' }} >
                                <TouchableOpacity style={[styles.viewButton]} onPress={() => setModalDelete(false)}>
                                    <MaterialCommunityIcons
                                        name="close"
                                        color="#000000"
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, }}>
                                <View onPress={() => setModalDelete(false)}>
                                    <MaterialCommunityIcons
                                        name="alert-outline"
                                        color="red"
                                        size={25}
                                    />
                                </View>
                                <Text>Are you sure want to delete this item ?</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => handleSubmitDelete()} style={styles.Button}>
                                    <Text>Sure</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    : null
                }
            </>
        )
    }

    useEffect(() => {
        setPrevNumber(0)
        setNextNumber(1)

    }, [])
    const renderCard = () => {
        return (
            <>
                {renderNotif()}
                <View style={[styles.viewCard]}>
                    <ScrollView
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        horizontal={true}
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.kolomContainer}>
                                {/* Kolom 1 */}
                                <View style={[styles.item, { width: 50 }]}>
                                    <Text style={styles.tableTextHead}>No</Text>
                                </View>
                                <View style={[styles.item, { width: 150 }]}>
                                    <Text style={styles.tableTextHead}>Date</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>Time</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>pH</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>TDS</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>Therm</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>Salinity</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>Ammonia</Text>
                                </View>
                                <View style={[styles.item, { width: 100 }]}>
                                    <Text style={styles.tableTextHead}>Action</Text>
                                </View>
                            </View>

                            {dataSensor == null && data ?
                                data.map((ss, index) => {
                                    if (index >= prevNumber * jumlah && index < jumlah * nextNumber) {
                                        return (
                                            <React.Fragment key={ss.id}>
                                                <View style={styles.kolomContainer}>
                                                    {/* Kolom 2 */}
                                                    <View style={[styles.item, { width: 50 }]}>
                                                        <Text style={styles.tableText}>{index + 1}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 150 }]}>
                                                        <Text style={styles.tableText}>{format(parseISO(ss.created_at), 'dd MMMM yyyy')}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{format(parseISO(ss.created_at), 'HH:mm')}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value1.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value2.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value3.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value4.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value5.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableOpacity
                                                                style={styles.viewAction}
                                                                onPress={() => handleDelete(ss.id)}
                                                            >
                                                                <MaterialCommunityIcons
                                                                    name="delete"
                                                                    color="#000000"
                                                                    size={25}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </React.Fragment>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                                :
                                dataSensor.map((ss, index) => {
                                    if (index >= prevNumber * jumlah && index < jumlah * nextNumber) {
                                        return (
                                            <React.Fragment key={ss.id}>
                                                <View style={styles.kolomContainer}>
                                                    {/* Kolom 2 */}
                                                    <View style={[styles.item, { width: 50 }]}>
                                                        <Text style={styles.tableText}>{index + 1}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 150 }]}>
                                                        <Text style={styles.tableText}>{format(parseISO(ss.created_at), 'dd MMMM yyyy')}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{format(parseISO(ss.created_at), 'HH:mm')}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value1.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value2.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value3.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value4.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <Text style={styles.tableText}>{ss.value5.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={[styles.item, { width: 100 }]}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableOpacity
                                                                style={styles.viewAction}
                                                                onPress={() => handleDelete(ss.id)}
                                                            >
                                                                <MaterialCommunityIcons
                                                                    name="delete"
                                                                    color="#000000"
                                                                    size={25}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </React.Fragment>
                                        )
                                    } else {
                                        return null
                                    }
                                })

                            }
                        </View>
                    </ScrollView>
                    <View style={styles.viewPagination}>
                        <TouchableOpacity
                            style={styles.viewPageLeft}
                            onPress={() => handlePrev()}
                        >
                            {/* <Text>+</Text> */}
                            <MaterialCommunityIcons
                                name="chevron-left"
                                color="#000000"
                                size={25}
                            />
                        </TouchableOpacity>
                        <View style={styles.viewNumber}>
                            <Text style={{ fontSize: 24, color: '#000000' }}>{nextNumber}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.viewPageRight}
                            onPress={() => handlNext()}
                        >
                            <MaterialCommunityIcons
                                name="chevron-right"
                                color="#000000"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }

    if (data != null) {
        return (
            <>
                {renderPopUp()}
                {renderCard()}
            </>
        )
    } else {
        return (
            <View style={[styles.viewCard]}>
                <View style={[styles.viewLoading]}>
                    <ActivityIndicator size={30} color={"black"} />
                </View>
            </View>
        )
    }
}

export default Card

const styles = StyleSheet.create({
    viewCard: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 40,
        width: '90%',
        minHeight: 500,
        marginBottom: 50,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        padding: 20
    },
    viewLoading: {
        width: '100%',
        height: 500,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        paddingBottom: 12,
        borderColor: '#000000',
        borderBottomWidth: 1,
    },
    tableTextHead: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    tableText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
    },
    kolomContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
        // alignItems: 'center',
    },
    item: {
        height: 45,
        margin: 5,
        flexDirection: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewPagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    viewPageLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
        // backgroundColor: '#FFC300'
    },
    viewPageRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        // paddingLeft: 15,
        // paddingRight: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    viewAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 45,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    viewNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        // borderWidth: 1,
    },
    viewPopUp: {
        position: 'absolute',
        zIndex: 20,
        minHeight: 700,
        width: '100%',
        flexDirection: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemPopUp: {
        padding: 20,
        top: -90,
        width: '80%',
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap: 15,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7
    },
    viewButton: {
        height: 45,
        width: 45,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    Button: {
        minWidth: 45,
        maxWidth: 100,
        padding: 10,
        flexDirection: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    notif: {
        position: 'absolute',
        flexDirection: 'row',
        gap: 5,
        right: 20,
        top: -100,
        zIndex: 100,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        padding: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    }
})