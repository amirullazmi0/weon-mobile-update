import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'


const Header = () => {
    return (
        <>
            <StatusBar backgroundColor="#00A6FB" barStyle="light-content" />
            <View style={styles.viewHead}>
                <Image
                    source={require('../../img/user.jpg')}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                    }}
                />
                {/* <Text style={[styles.textHead, { flex: 1 }]}>Water</Text> */}
                {/* <Text style={[styles.textHead, { flex: 1 }]}>Water</Text> */}
                {/* <Text style={styles.textNotif}>Notif</Text> */}
            </View >
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    viewHead: {
        backgroundColor: '#00A6FB',
        // backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: '100%',
        padding: 20,
        marginBottom: 5,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    textHead: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#FFFFFF',

    },
    textNotif: {
        fontStyle: 'italic',
        marginLeft: 'auto',
        fontSize: 20,
        color: '#FFFFFF'
    }
})