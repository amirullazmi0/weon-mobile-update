import { StyleSheet, Text, Modal, View, ScrollView, Pressable, ActivityIndicator, Animated, TouchableOpacity, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
import moment from 'moment';
const ChartDaily = ({ title, api }) => {

    const [date, setDate] = useState(new Date());
    const [dateStart, setDateStart] = useState(moment(date).format(`YYYY-MM`))
    const [displayMonth, setDisplayMonth] = useState(moment(date).format('MMMM'))
    const [month, setMonth] = useState(moment(date).format(`MM`))
    const [year, setYear] = useState(moment(date).format(`YYYY`))
    const [Loading, setLoading] = useState(true)
    const [dataRata, setDataRata] = useState()
    const [nav, setNav] = useState('ph')
    const [modalMonthVisible, setModalMonthVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const getData = async () => {
        try {
            const response = await axios.get(`${api}?start=${year}-${month}`)
            // console.log(response.data.data.length > 0);
            if (response.data.data.length > 0) {
                setDataRata(response.data.data)
                setLoading(false)
            } else {
                setDataRata(null)
            }
        } catch (error) {
        }
    }

    const handlePointClick = (pointData) => {
        console.log('Clicked point data:', pointData);
        // Perform actions based on the clicked data point
    };

    const bulan = [
        { id: 1, name: `Januari` },
        { id: 2, name: `Februari` },
        { id: 3, name: `Maret` },
        { id: 4, name: `April` },
        { id: 5, name: `Mei` },
        { id: 6, name: `Juni` },
        { id: 7, name: `Juli` },
        { id: 8, name: `Agustus` },
        { id: 9, name: `September` },
        { id: 10, name: `Oktober` },
        { id: 11, name: `November` },
        { id: 12, name: `Desember` },
    ]

    const tahun = [
        { id: 2015 },
        { id: 2016 },
        { id: 2017 },
        { id: 2018 },
        { id: 2019 },
        { id: 2020 },
        { id: 2021 },
        { id: 2022 },
        { id: 2023 },
        { id: 2024 },
        { id: 2025 },
        { id: 2026 },
        { id: 2027 },
        { id: 2028 },
        { id: 2029 },
        { id: 2030 },
    ]

    useEffect(() => {
        getData()
        // setDisplayMonth(moment(month).format('MMMM'))
    }, [nav, dataRata, month, year])

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: true // optional
    };

    const rataRata = useMemo(() => {
        return {
            labels: dataRata ? dataRata.map((item) => item.name) : ['', '', '', '', ''],
            datasets: [
                {
                    data:
                        nav == 'ph' && dataRata ? dataRata.map((item) => item.value1) :
                            nav == 'tds' && dataRata ? dataRata.map((item) => item.value2) :
                                nav == 'therm' && dataRata ? dataRata.map((item) => item.value3) :
                                    nav == 'sal' && dataRata ? dataRata.map((item) => item.value4) :
                                        nav == 'amo' && dataRata ? dataRata.map((item) => item.value5) : [0, 0, 0, 0, 0],
                    color: (opacity = 1) => `rgba(255, 195, 0, ${opacity})`,
                    strokeWidth: 2
                },
            ],
        };
    }, [nav, dataRata, month, year]);

    const handlePickYear = (e) => {
        setYear(e)
        setModalVisible(false)
    }
    const handlePickMonth = (e, i) => {
        setMonth(e)
        setDisplayMonth(i)
        setModalMonthVisible(false)
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                    {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ fontSize: 15 }}>Close</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 7, justifyContent: 'center', padding: 10, }}>
                        {tahun && tahun.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => handlePickYear(item.id)} style={year == item.id ? styles.btnItemModalActive : styles.btnItemModal} key={index}><Text style={year == item.id ? { textAlign: 'center', fontWeight: 'bold' } : { textAlign: 'center' }}>{item.id}</Text></TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </Modal>
        )
    }
    const renderMonthModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMonthVisible}
                onRequestClose={() => {
                    setModalMonthVisible(!modalMonthVisible);
                }}>
                <View style={styles.modalView}>
                    {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalMonthVisible(!modalMonthVisible)}>
                            <Text style={{ fontSize: 15 }}>Close</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 7, justifyContent: 'center', padding: 10, }}>
                        {bulan && bulan.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => handlePickMonth(item.id, item.name)} style={month == item.id ? styles.btnItemModalActive : styles.btnItemModal} key={index}><Text style={month == item.id ? { textAlign: 'center', fontWeight: 'bold' } : { textAlign: 'center' }}>{item.name}</Text></TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <>
            <View style={styles.viewItem}>
                {renderModal()}
                {renderMonthModal()}
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>{title}</Text>
                <ScrollView
                    style={styles.nav}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity onPress={() => setNav('ph')} style={nav == 'ph' ? styles.navItemActive : styles.navItem}>
                        <Text style={nav == 'ph' ? styles.textItemActive : styles.textItem}>pH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setNav('tds')} style={nav == 'tds' ? styles.navItemActive : styles.navItem}>
                        <Text style={nav == 'tds' ? styles.textItemActive : styles.textItem}>TDS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setNav('therm')} style={nav == 'therm' ? styles.navItemActive : styles.navItem}>
                        <Text style={nav == 'therm' ? styles.textItemActive : styles.textItem}>Thm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setNav('sal')} style={nav == 'sal' ? styles.navItemActive : styles.navItem}>
                        <Text style={nav == 'sal' ? styles.textItemActive : styles.textItem}>Sal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setNav('amo')} style={nav == 'amo' ? styles.navItemActive : styles.navItem}>
                        <Text style={nav == 'amo' ? styles.textItemActive : styles.textItem}>Amo</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.viewDate}>
                    <TouchableOpacity onPress={() => setModalMonthVisible(true)} style={styles.viewDateItem}>
                        <Text style={{ textAlign: 'center', color: '#ffffff' }}>{displayMonth}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnDate}>
                        <Text style={styles.textBtnDate}>{year}</Text>
                    </TouchableOpacity>
                </View>
                {dataRata && rataRata && Loading == false ?
                    <>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <LineChart
                                data={rataRata}
                                width={1700}
                                height={220}
                                chartConfig={chartConfig}
                                bezier
                                onDataPointClick={handlePointClick}
                            />
                        </ScrollView>
                    </>
                    :
                    <View>
                        <View style={[styles.viewLoading]}>
                            {/* <ActivityIndicator size={30} color={"black"} /> */}
                            <Text>Data Not Found</Text>
                        </View>
                    </View>
                }
            </View>
        </>
    )
}

export default ChartDaily

const styles = StyleSheet.create({
    viewBody: {
        height: '100%',
        flexDirection: 'column',
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
        // flexDirection: 'row',
        // justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        // shadowColor: '#006494',
        // elevation: 2,
        // borderRadius: 10,
        rowGap: 10,
        zIndex: 10,
        gap: 1,
    },
    navItem: {
        backgroundColor: '#ffffff',
        padding: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        width: 100,
        margin: 5,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
    },
    navItemActive: {
        backgroundColor: '#FFD60A',
        zIndex: 20,
        padding: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        width: 100,
        margin: 5,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
    },
    textItem: {
        color: '#8b8c89',
        textAlign: 'center'
    },
    textItemActive: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
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
    viewDate: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        // justifyContent: 'center',
        gap: 10,
    },
    viewDateItem: {
        width: '50%',
        padding: 10,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: '#023047',
        borderRadius: 10,
    },
    btnDate: {
        width: '20%',
        padding: 10,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: '#ff6700',
        borderRadius: 10,
    },
    textBtnDate: {
        textAlign: 'center',
        color: '#ffffff',
    },
    modalView: {
        margin: 10,
        marginTop: 200,
        backgroundColor: '#022b3a',
        borderRadius: 20,
        padding: 15,
        width: '95%',
        // height: `70%`,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 7,
    },
    btnItemModal: {
        padding: 10,
        backgroundColor: '#ffffff',
        padding: 7,
        width: '30%',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 7,
    },

    btnItemModalActive: {
        padding: 10,
        backgroundColor: '#FFD60A',
        padding: 7,
        width: '30%',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 7,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#ffffff',
        padding: 7,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 7,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})