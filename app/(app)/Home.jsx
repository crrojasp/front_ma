import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateAPet from '../CreateAPet';
import InterestPeople from '../InterestPeople';
import Pets from '../Pets';
import Profile from '../Profile';
import CustomBottomTab from '../../components/BottomTabs/CustomBottonTab';
import { useAuth } from '../../context/authContext';
import Favourites from '../Favourites';
import Recommended from '../CarouselRecomendedPets';
const Tab = createBottomTabNavigator();

const BottomTabs1 = () => {
    return (
        <Tab.Navigator tabBar={(props)=>
            <CustomBottomTab {...props}/>}
        >
            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Encuentra una mascota!'
                    }}
                    name="Encuentra una mascota"
                    component={Recommended}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Solicitudes realizadas'
                    }}
                    name="Solicitudes realizadas"
                    component={InterestPeople}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Mascotas'
                    }}
                    name="Mascotas favoritas"
                    component={Favourites}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Perfil'
                    }}
                    name="Perfil de la cuenta"
                    component={Profile}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};

const BottomTabs2 = () => {
    return (
        <Tab.Navigator tabBar={(props)=>
            <CustomBottomTab {...props}/>}
        >
            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Registrar una mascota!'
                    }}
                    name="Registro de mascota"
                    component={CreateAPet}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Interesados'
                    }}
                    name="Interesados"
                    component={InterestPeople}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Mascotas'
                    }}
                    name="Mascotas creadas"
                    component={Pets}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Perfil'
                    }}
                    name="Perfil de la cuenta"
                    component={Profile}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'flex-end', // Alinea el contenedor a la derecha
        borderWidth: 1,  // Añade un borde de 1 píxel
    },
});

export default function Home() {
    const { logout, user } = useAuth();
    const isFutureAdopter = user.rol === "Futuro adoptante";
    const isFoundation = user.rol === "Fundación";

    return (
        <SafeAreaProvider>
            <View style={{ paddingTop: hp(1), paddingHorizontal: wp(3.25), flex: 1 }}>
                {!isFoundation ? (
                    <BottomTabs1 />
                ) : (
                    <BottomTabs2 />
                )}
            </View>
        </SafeAreaProvider>
    );
}
