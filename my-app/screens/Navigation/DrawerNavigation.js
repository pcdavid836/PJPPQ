import { React, useContext, useState } from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer"
import { AuthContext } from '../../context/AuthContext';

import CustomDrawer from "../../components/CustomDrawer/CustomDrawer"
import Ionicons from 'react-native-vector-icons/Ionicons'

import MapScreen from "../MainMenu/Map"
import BookingScreen from "../MainMenu/Booking"
import ProfileScreen from "../MainMenu/Profile"
import CreateParkingScreen from "../MainMenu/CreateParking"
import VehicleScreen from "../MainMenu/Vehicle"
import MyParkScreen from "../MainMenu/MyPark"


const Drawer = createDrawerNavigator()


export function DrawerNavigation() {
    const { userInfo } = useContext(AuthContext);
    return (

        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#d67574',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                }
            }}>
            <Drawer.Screen name="Mapa" component={MapScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="map-outline" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Perfil" component={ProfileScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="person-circle-outline" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Mis Vehiculos" component={VehicleScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="car-outline" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Reserva" component={BookingScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="receipt-outline" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Postular Puesto" component={CreateParkingScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="reader-outline" size={22} color={color} />
                )
            }} />
            {userInfo.idRol === 2 || userInfo.idRol === 3 || userInfo.idRol === 4 &&(
                // Bloque de código que se ejecuta si el usuario tiene el rol 2
                <Drawer.Screen name="Mi Parqueo" component={MyParkScreen} options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="reader-outline" size={22} color={color} />
                    )
                }} />
            )}
        </Drawer.Navigator>

    )

}