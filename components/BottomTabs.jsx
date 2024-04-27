import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateAPet from "../app/CreateAPet";
import Favourites from "../app/Favourites";
import Pets from "../app/Pets";
import Profile from "../app/Profile";
import InterestPeople from '../app/InterestPeople';
import CustomBottomTab from './BottomTabs/CustomBottonTab';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator tabBar={(props)=>{
            <CustomBottomTab {...props}/>
        }}>
            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                    <Tab.Screen
                        options={{
                            tabBarLabel : 'Registrar una mascota!'
                        }}
                        name = "Registro de mascota"
                        component={CreateAPet}
                    />
                    <Tab.Screen
                        options={{
                            tabBarLabel : 'Interesados'
                        }}
                        name = "Interesados"
                        component={InterestPeople}
                    />
                    <Tab.Screen
                        options={{
                            tabBarLabel : 'Mascotas'
                        }}
                        name = "Mascotas creadas"
                        component={Pets}
                    />
                    <Tab.Screen
                        options={{
                            tabBarLabel : 'Perfil'
                        }}
                        name = "Perfil de la cuenta"
                        component={Profile}
                    />
            </Tab.Group>
        </Tab.Navigator>
    )
}