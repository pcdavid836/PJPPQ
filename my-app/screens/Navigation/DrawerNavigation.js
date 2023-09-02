import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import prueba1 from "../prueba1/prueba1"

const Drawer = createDrawerNavigator()

export function DrawerNavigation() {
    return(

    <Drawer.Navigator>
        <Drawer.Screen name = "Prueba1" component = { prueba1 } />
    </Drawer.Navigator>

    )

}