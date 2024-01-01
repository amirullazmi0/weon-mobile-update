import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Header = ({ reload, connect }) => {
    const [notif, setNotif] = useState(false)

    const renderNotif = () => {
        setNotif(true)
    }
    return (
        <>
            <StatusBar backgroundColor="#00A6FB" />
            <View style={styles.viewHead}>
                {/* <Text style={styles.textHead}>Water Echoes</Text> */}
                <Image style={styles.imgLogo} source={require('../../img/weon.png')} />
                <View style={styles.leftHeader}>
                    <TouchableOpacity onPress={reload} style={connect == true ? styles.Connect : styles.disConnect}></TouchableOpacity>
                    {/* <TouchableOpacity style={styles.Notif} onPress={() => renderNotif()}>
                        <Icon name="bell" style={styles.textNotif} />
                    </TouchableOpacity> */}
                </View>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    viewHead: {
        // backgroundColor: '#00A6FB',
        backgroundColor: '#00A6FB',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 150,
    },
    leftHeader: {
        flexDirection: 'row',
        gap: 10,
    },
    Connect: {
        backgroundColor: '#70E000',
        height: 20,
        width: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
    },
    disConnect: {
        backgroundColor: '#F40000',
        height: 20,
        width: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
    },
    imgLogo: {
        height: 60,
        width: 60
    },
    textHead: {
        fontStyle: 'italic',
        marginRight: 'auto',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',

    },
    Notif: {
        fontStyle: 'italic',
        marginLeft: 'auto',
        fontSize: 20,
        color: '#FFFFFF'
    },
    textNotif: {
        fontStyle: 'italic',
        marginLeft: 'auto',
        fontSize: 20,
        color: '#FFFFFF'
    }
})