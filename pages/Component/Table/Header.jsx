import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Header = () => {
    return (
        <>
            <StatusBar backgroundColor="#00A6FB" />
            <View style={styles.viewHead}>
                <Text style={styles.textHead}>Data History</Text>
                {/* <Text style={styles.textNotif}>Notif</Text> */}
            </View>
        </>
    )
}

export default Header


const styles = StyleSheet.create({
    viewHead: {
        backgroundColor: '#00A6FB',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 50,
        paddingBottom: 70,
        marginBottom: -40,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    viewCard: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        width: '90%',
    },
    textHead: {
        // fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 21,
        color: '#FFFFFF',

    },
    textNotif: {
        fontStyle: 'italic',
        marginLeft: 'auto',
        fontSize: 20,
        color: '#FFFFFF'
    }
})