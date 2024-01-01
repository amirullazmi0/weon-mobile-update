import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from './Navigation/AuthContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
// import { base_url } from 'react-native-dotenv';

export default function Login({ navigation }) {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [token, setToken] = useState(null)
    const [login, setLogin] = useState(null)

    const [notif, setNotif] = useState(false)
    const [isiNotif, setIsiNotif] = useState(null)
    const [jenisNotif, setJenisNotif] = useState(null)
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const { signIn } = useContext(AuthContext)
    const { signOut } = useContext(AuthContext)

    const pullToken = async () => {
        const value = await AsyncStorage.getItem('userToken');

        console.log(value);
        // signIn({
        //     token: value
        // })
    }

    useEffect(() => {
        pullToken()
    }, [])

    const handleEmailChange = (e) => {
        setEmail(e);
    };

    const handlePasswordChange = (e) => {
        setPassword(e);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${base_url}/api/login`, {
                email: email,
                password: password
            });
            if (response.data.success == true) {
                setNotif(true)
                setIsiNotif(response.data.message)
                setJenisNotif('success')
                await AsyncStorage.setItem('userToken', response.data.data.token)

                setTimeout(() => {
                    setLogin(response.data.success)
                    navigation.replace("splash")
                }, 3000)
            } else {
                setNotif(true)
                setJenisNotif('failed')
                setIsiNotif(response.data.message)
            }

        } catch (error) {
            // console.error(error);
            setNotif(true)
            setJenisNotif('failed')
            setIsiNotif('Error Network')
        }
    }

    const renderNotif = () => {
        setTimeout(() => {
            setNotif(false)
            setIsiNotif(null)
            setJenisNotif(null)
        }, 40000)
        return (
            <>
                {notif == true ?
                    <View style={styles.notif}>
                        <Text style={{ textTransform: 'capitalize' }}>{isiNotif}</Text>
                        {jenisNotif == 'success' ?
                            <MaterialCommunityIcons
                                name="check"
                                color="#000000"
                                size={20}
                            />
                            :
                            <MaterialCommunityIcons
                                name="alert-circle"
                                color="#000000"
                                size={20}
                            />
                        }
                    </View> : null
                }
            </>
        )
    }

    return (
        <>
            <View style={styles.body}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <View style={styles.viewForm}>
                    <Image style={styles.imgLogo} source={require('./img/weon.png')} />
                    {renderNotif()}
                    <Text style={styles.textLogin}>Sign In</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={handleEmailChange}
                        placeholder='Your Email'
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
                        placeholder='Your Password'
                    />
                    <TouchableOpacity
                        style={styles.btnLogin}
                        // onPress={() => { signIn() }}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewFooter}>
                    <Text style={styles.textFooter}>
                        WEon 1.0v 2023
                    </Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 0,
    },
    viewForm: {
        marginTop: 'auto',
        backgroundColor: '#FFFFFF',
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50,
        borderRadius: 30,
        shadowColor: '#006494',
        shadowOpacity: 0.3,
        elevation: 7,
    },
    textLogin: {
        // marginBottom: 10,
        color: '#000000',
        fontWeight: 'bold',
        width: '100%',
        fontSize: 30
    },
    imgLogo: {
        height: 100,
        width: 100
    },
    input: {
        backgroundColor: '#e7ecef',
        borderRadius: 10,
        borderColor: 'white',
        margin: 10,
        height: 55,
        width: "100%",
        padding: 20,
    },
    btnLogin: {
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    btnText: {
        color: '#000000',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 17,
    },
    viewFooter: {
        padding: 10,
        marginTop: 'auto',
    },
    textFooter: {
        color: '#000000',
        fontSize: 12,
    },
    notif: {
        position: 'absolute',
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        right: 20,
        top: 120,
        padding: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
        zIndex: 100
    }
});