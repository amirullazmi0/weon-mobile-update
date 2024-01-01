import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import React, { useContext, useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../../Navigation/AuthContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Card = ({ user }) => {
    const base_url = 'http://iot.roomiroo.my.id'
    const ratarata_url = 'http://103.175.220.210:3000'
    const { signOut } = useContext(AuthContext)
    const [token, setToken] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState(null)
    const [password2, setPassword2] = useState(null)

    const [errorName, setErrorName] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorPassword2, setErrorPassword2] = useState(null)

    const [alertProfile, setAlertProfile] = useState(false)
    const [alertPassword, setAlertPassword] = useState(false)

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            // console.log(token);
            const response = await axios.get(`${base_url}/api/auth`, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            console.log(response.data.data.name);
            if (response.data.data) {
                setName(response.data.data.name)
                setEmail(response.data.data.email)
            }
        } catch (error) {
        }
    }


    useEffect(() => {
        getData()
    }, [])
    const handleName = (e) => {
        setName(e)
    }
    const handleEmail = (e) => {
        setEmail(e)
    }
    const handlePassword = (e) => {
        setPassword(e)
    }
    const handlePassword2 = (e) => {
        setPassword2(e)
    }

    const handleAlertProfile = () => {
        setTimeout(() => {
            setAlertProfile(false)
            setErrorName(null)
            setErrorEmail(null)
        }, 20000)
        return (
            <>
                <View style={alertProfile == true ? { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' } : { display: 'none' }} >
                    <View style={styles.viewAlert}>
                        <Text style={[styles.textAlert, { marginRight: 10 }]}>Update Success</Text>
                        <MaterialCommunityIcons
                            name="check"
                            color="#000000"
                            size={25}
                        />
                    </View>
                </View >
            </>
        )
    }
    const handleAlertPassword = () => {
        setTimeout(() => {
            setAlertPassword(false)
            setErrorPassword(null)
            setErrorPassword2(null)
        }, 20000)
        return (
            <>
                <View style={alertPassword == true ? { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' } : { display: 'none' }} >
                    <View style={styles.viewAlert}>
                        <Text style={[styles.textAlert, { marginRight: 10 }]}>Update Password Success</Text>
                        <MaterialCommunityIcons
                            name="check"
                            color="#000000"
                            size={25}
                        />
                    </View>
                </View >
            </>
        )
    }
    const handleUpdateProfile = async () => {
        const token = await AsyncStorage.getItem('userToken');
        try {
            const response = await axios.post(`${base_url}/api/updateUser`, {
                name: name,
                email: email,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            console.log('response :', response.data);
            if (response.data.success == true) {
                await AsyncStorage.setItem('userName', response.data.user.name)
                await AsyncStorage.setItem('userEmail', response.data.user.email)
                setErrorName(null)
                setErrorEmail(null)
                setAlertProfile(true)
            } else {
                if (response.data.errors.email) {
                    setErrorEmail(response.data.errors.email)
                }
                if (response.data.errors.name) {
                    setErrorName(response.data.errors.name)
                }
            }
        } catch (error) {
            // console.error(error);
        }
    }
    const handleUpdatePassword = async () => {
        const token = await AsyncStorage.getItem('userToken');
        try {
            const response = await axios.post(`${base_url}/api/updatePasswordUser`, {
                password: password,
                password2: password2,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Contoh pengaturan header otorisasi dengan token JWT
                    'Content-Type': 'application/json', // Contoh pengaturan header tipe konten sebagai JSON
                    // Tambahkan header lain sesuai kebutuhan Anda
                }
            });
            console.log('pass :', response.data);
            if (response.data.success == true) {
                setErrorPassword(null)
                setErrorPassword2(null)
                setAlertPassword(true)

            } else {
                if (response.data.errors.password) {
                    setErrorPassword(response.data.errors.password)
                }
                if (response.data.errors.password2) {
                    setErrorPassword2(response.data.errors.password2)
                }
            }
        } catch (error) {
            // console.error(error);
        }
        setPassword(null)
        setPassword2(null)
    }


    return (
        <>
            <View style={styles.viewCard}>
                <View style={styles.viewCardHead}>
                    <MaterialCommunityIcons
                        name="account"
                        color="#000000"
                        size={25}
                    />
                </View>
                {handleAlertProfile()}
                {name && email ?
                    <View style={styles.viewCardForm}>
                        <View style={styles.viewForm}>
                            <Text style={styles.textLabel}>Name</Text>
                            <TextInput
                                style={errorName ? styles.textInputError : styles.textInput}
                                placeholder='Yourname'
                                value={name}
                                onChangeText={handleName}
                            />
                            {errorName &&
                                <Text style={styles.textLabelError}>{errorName}</Text>
                            }
                        </View>
                        <View style={styles.viewForm}>
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                style={errorEmail ? styles.textInputError : styles.textInput}
                                placeholder='Your Email'
                                value={email}
                                onChangeText={handleEmail}
                            />
                            {errorEmail &&
                                <Text style={styles.textLabelError}>{errorEmail}</Text>
                            }
                        </View>
                        <TouchableOpacity
                            style={[styles.btnLight, { marginTop: 10 }]}
                            onPress={() => handleUpdateProfile()}>
                            <Text style={styles.btnTextLight}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ padding: 20, marginTop: 40, marginBottom: 60 }}>
                        <ActivityIndicator size={25} color={"black"} />
                    </View>
                }
            </View>

            {/* Change Password */}
            <View style={styles.viewCard}>
                <View style={styles.viewCardHead}>
                    <MaterialCommunityIcons
                        name="key"
                        color="#000000"
                        size={25}
                    />
                </View>
                {handleAlertPassword()}
                {email && name ?
                    <View style={styles.viewCardForm}>
                        <View style={styles.viewForm}>
                            <Text style={styles.textLabel}>New password</Text>
                            <TextInput
                                style={errorPassword ? styles.textInputError : styles.textInput}
                                placeholder='new password'
                                value={password}
                                onChangeText={handlePassword}
                                secureTextEntry={true}
                            />
                            {errorPassword &&
                                <Text style={styles.textLabelError}>{errorPassword}</Text>
                            }
                        </View>
                        <View style={styles.viewForm}>
                            <Text style={styles.textLabel}>Confirm new password</Text>
                            <TextInput
                                style={(errorPassword2) || (password2 && password !== password2) ? styles.textInputError : styles.textInput}
                                placeholder='confirm your password'
                                value={password2}
                                onChangeText={handlePassword2}
                                secureTextEntry={true}
                            />
                            {errorPassword2 &&
                                <Text style={styles.textLabelError}>{errorPassword2}</Text>
                            }
                            {password2 && password !== password2 &&
                                <Text style={styles.textLabelError}>Password Confirm False</Text>
                            }
                        </View>
                        <TouchableOpacity
                            style={[styles.btnLight, { marginTop: 10 }]}
                            onPress={() => handleUpdatePassword()}>
                            <Text style={styles.btnTextLight}>Update Password</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ padding: 20, marginTop: 40, marginBottom: 60 }}>
                        <ActivityIndicator size={25} color={"black"} />
                    </View>
                }
            </View>
            <View style={[styles.viewCard, { padding: 10 }]}>
                <TouchableOpacity
                    style={[styles.btnBlue]}
                    onPress={() => { signOut() }}
                >
                    <Text style={[styles.btnTextBlue]}>Logout</Text>
                    {/* <Icon name='sign-out' size={20} /> */}
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Card


const styles = StyleSheet.create({
    viewCard: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 20,
        width: '90%',
        marginBottom: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
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
    viewCardForm: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
    },
    viewForm: {
        marginBottom: 10,
    },
    viewCardHead: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 5,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    viewCardHeadGreen: {
        backgroundColor: '#a5be00',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 20,
        zIndex: 5,
    },
    textInput: {
        width: '100%',
        padding: 10,
        paddingLeft: 25,
        backgroundColor: '#e7ecef',
        shadowColor: 'black',
        borderRadius: 15,
    },
    textInputError: {
        width: '100%',
        padding: 10,
        paddingLeft: 25,
        backgroundColor: '#e7ecef',
        borderColor: '#e70e02',
        borderWidth: 2,
        shadowColor: 'black',
        borderRadius: 15,
    },
    textLabel: {
        padding: 10,
        fontSize: 12,
    },
    textLabelError: {
        padding: 10,
        fontSize: 12,
        color: '#e70e02',
        textAlign: 'right'
    },
    btnLight: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    btnBlue: {
        backgroundColor: '#0582CA',
        // marginTop: 10,
        padding: 7,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 7,
    },
    btnTextBlue: {
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 17,
    },
    btnTextLight: {
        color: '#000000',
        textTransform: 'capitalize',
        fontSize: 15,
    },

})