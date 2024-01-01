import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Animated, TouchableOpacity, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from 'moment';
const ChartRatarata = ({ title, api }) => {

    const [date, setDate] = useState(new Date());
    const [dateStart, setDateStart] = useState(moment(date).format(`YYYY-MM-DD`))
    const [displayDateStart, setDisplayDateStart] = useState(moment(dateStart).format('DD MMMM YYYY'))
    const [Loading, setLoading] = useState(true)
    const [dataRata, setDataRata] = useState()
    const [nav, setNav] = useState('ph')

    const getData = async () => {
        try {
            const response = await axios.get(`${api}?start=${dateStart}`)

            if (response.data.data.length > 0) {
                setDataRata(response.data.data)
                setLoading(false)
            } else {
                setDataRata(null)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
        // console.log('date', date);
    }, [nav, dataRata, dateStart])

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
            labels: dataRata ? dataRata.map((item) => item.name) : [],
            datasets: [
                {
                    data:
                        nav == 'ph' && dataRata ? dataRata.map((item) => item.value1) :
                            nav == 'tds' && dataRata ? dataRata.map((item) => item.value2) :
                                nav == 'therm' && dataRata ? dataRata.map((item) => item.value3) :
                                    nav == 'sal' && dataRata ? dataRata.map((item) => item.value4) :
                                        nav == 'amo' && dataRata ? dataRata.map((item) => item.value5) : [],
                    color: (opacity = 1) => `rgba(255, 195, 0, ${opacity})`,
                    strokeWidth: 2
                },
            ],
        };
    }, [nav, dataRata, dateStart]);


    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        console.log(event, selectedDate);
        setDateStart(moment(selectedDate).format('YYYY-MM-DD'))
        setDisplayDateStart(moment(selectedDate).format('DD MMMM YYYY'))
        setShow(false);
    };

    const showMode = () => {
        setShow(true);
        // setMode(currentMode);
    };

    return (
        <>
            <View style={styles.viewItem}>

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
                    <View style={styles.viewDateItem}>
                        <Text>{displayDateStart}</Text>
                        {/* <DateTimePicker testID="dateTimePicker" value={date} mode='date' display='default' /> */}
                        {/* <DatePicker date={date} locale='id' androidVariant='nativeAndroid' /> */}
                        {show &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                is24Hour={true}

                                display="default"
                                onChange={onChange}
                            // onTouchCancel={() => setShow(false)}
                            // onTouchEnd={() => setShow(false)}
                            />
                        }
                    </View>
                    <TouchableOpacity onPress={showMode} style={styles.btnDate}>
                        <Text style={styles.textBtnDate}>Date</Text>
                    </TouchableOpacity>
                </View>
                {dataRata && rataRata && Loading == false ?
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <LineChart
                            data={rataRata}
                            width={1200}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </ScrollView>
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

export default ChartRatarata

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
        justifyContent: 'center',
        gap: 10,
    },
    viewDateItem: {
        width: '70%',
        padding: 10,
        shadowColor: '#006494',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    btnDate: {
        width: '30%',
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
    }
})