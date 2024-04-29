import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { Entypo } from '@expo/vector-icons';

export default function CreateAPet() {
    const { logout, user } = useAuth();
    const handleLogout = async () => {
        await logout();
    };

    return (
        <SafeAreaProvider>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Registra una mascota</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Entypo name="log-out" size={26} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});