import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function dataGraphBulanan() {
    const [sensor, setSensor] = useState(null)
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const getData = async () => {
        const value = await AsyncStorage.getItem('dataSensor')
        setSensor(JSON.parse(value))
    }

    const [valueBulanan, setValueBulanan] = useState(
        [
            { id: 1, name: "jan", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 2, name: "feb", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 3, name: "mar", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 4, name: "apr", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 5, name: "mai", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 6, name: "jun", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 7, name: "jul", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 8, name: "aug", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 9, name: "sept", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 10, name: "okt", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 11, name: "nov", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
            { id: 12, name: "des", tahun: 0, jumlah: 0, value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, },
        ]
    )

    const iniBulanan = () => {
        let jmlh = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ]
        let v1 = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        let v2 = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        let v3 = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        let v4 = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        let v5 = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        if (!sensor) {
            return
        }
        console.log("lanjut");
        for (let i = 0; i < sensor.length; i++) {
            const dateTime = new Date(sensor[i].created_at)
            // console.log('date ', dateTime);
            const tanggal = dateTime.getDate()
            const bulan = dateTime.getMonth() + 1
            const tahun = dateTime.getFullYear()

            for (let j = 0; j < valueBulanan.length; j++) {
                if ((bulan == valueBulanan[j].id)) {
                    const newValueBulanan = [...valueBulanan];
                    v1[j] += parseFloat(sensor[i].value1)
                    v2[j] += parseFloat(sensor[i].value2)
                    v3[j] += parseFloat(sensor[i].value3)
                    v4[j] += parseFloat(sensor[i].value4)
                    v5[j] += parseFloat(sensor[i].value5)
                    newValueBulanan[j].tahun = tahun;
                    newValueBulanan[j].jumlah = jmlh[j]++;
                    newValueBulanan[j].value1 = (v1[j] / valueBulanan[j].jumlah).toFixed(3);
                    newValueBulanan[j].value2 = (v2[j] / valueBulanan[j].jumlah).toFixed(3);
                    newValueBulanan[j].value3 = (v3[j] / valueBulanan[j].jumlah).toFixed(3);
                    newValueBulanan[j].value4 = (v4[j] / valueBulanan[j].jumlah).toFixed(3);
                    newValueBulanan[j].value5 = (v5[j] / valueBulanan[j].jumlah).toFixed(3);
                    setValueBulanan(newValueBulanan)
                }
            }

        }
    }

    const renderBulanan = () => {
        let newLineData = [];

        // Loop melalui valueBulanan
        for (let i = 0; i < valueBulanan.length; i++) {
            const dataBulanan = valueBulanan[i];

            // Ubah nilai lineData.value dengan value1 dari valueBulanan
            const newValue = parseFloat(dataBulanan.value1).toFixed(2);
            newLineData.push({ value: newValue, labelComponent: () => customLabel(dataBulanan.name) });
        }

        // Set nilai lineData dengan data yang telah diubah
        setLineData(newLineData);
    }

    console.log('bulanan :', valueBulanan[6].value1, valueBulanan[6].name);
    useEffect(() => {
        const Interval = setInterval(() => {
            iniBulanan()
            renderBulanan()
            getData()
        }, 3000);

        return () => {
            // Hentikan interval saat komponen dibongkar
            clearInterval(Interval);
        };
    }, [])
}

// export default DataGraph

const styles = StyleSheet.create({})