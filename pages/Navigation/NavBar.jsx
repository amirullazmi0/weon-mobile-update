import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Dashboard from '../Pages/Dashboard';
import Calibrate from '../Pages/Calibrate';
import Profil from '../Pages/Profil';
import Table from '../Pages/Table';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chart from '../Pages/Chart';

const Tab = createBottomTabNavigator();

const NavBar = () => {
    return (
        <>
            {/* <View><Text>gas</Text></View> */}
            <Tab.Navigator
                initialRouteName='dashboard'
                style={styles.viewNav}info iconY

                screenOptions={({ route }) => ({
                    tabBarStyle: { height: 65 }, // Atur tinggi sesuai kebutuhan
                    tabBarLabelStyle: { fontSize: 14 }, // Atur ukuran teks label sesuai kebutuhan
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === 'calibrate') {
                            iconName = 'flask-empty-outline';
                        } else if (route.name === 'dashboard') {
                            iconName = 'waves';
                        } else if (route.name === 'table') {
                            iconName = 'table';
                        } else if (route.name === 'profil') {
                            iconName = 'account';
                        } else if (route.name === 'chart') {
                            iconName = 'chart-line-variant';
                        }

                        const iconStyle = focused
                            ? {
                                borderBottomWidth: 1,
                                borderColor: '#00a6fb'
                            }
                            : {
                                borderBottomWidth: 0
                            };
                        return <MaterialCommunityIcons
                            name={iconName}
                            color={"#000000"}
                            size={focused ? 30 : 25}
                            style={focused ? styles.viewNavActive : null}
                        />;
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name="calibrate"
                    component={Calibrate}
                    options={{
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="chart"
                    component={Chart}
                    options={{
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="dashboard"
                    component={Dashboard}
                    options={{
                        headerShown: false
                    }} />
                <Tab.Screen
                    name="table"
                    component={Table}
                    options={{
                        headerShown: false
                    }} />
                <Tab.Screen
                    name="profil"
                    component={Profil}
                    options={{
                        headerShown: false
                    }} />
            </Tab.Navigator >
        </>
    )
}

export default NavBar

const styles = StyleSheet.create({
    viewNav: {
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    viewNavActive: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#006494',
        shadowOpacity: 0.5,
        elevation: 5,
        top: -10
    }
})