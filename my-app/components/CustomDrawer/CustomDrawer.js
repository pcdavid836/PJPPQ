import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView 
            {...props}
            contentContainerStyle={{ backgroundColor: '#8c182b' }}>
                <ImageBackground
                    source={require('../../assets/menu-bg.jpeg')}
                    style={{ padding: 20 }}>
                    <Image
                        source={require('../../assets/user.png')}
                        style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
                    />
                    <Text 
                        style={{
                        color: '#fff',
                        fontSize: 10,
                        marginBottom: 5,
                    }}>
                        Nombre Usuario
                    </Text>
                <View style={{flexDirection:'row'}}>
                    <Text
                    style={{
                        color: '#fff',
                        marginRight: 5,
                    }}>
                        Rol
                    </Text>
                </View>
            </ImageBackground>
            <View style={{flex:1, backgroundColor: '#fff', paddingTop:10}}>
                <DrawerItemList {...props} />
            </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={{
                            fontSize: 15,
                            marginLeft: 5,
                        }}>
                            Cerrar Sesión
                        </Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer