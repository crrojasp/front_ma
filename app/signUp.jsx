import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, FontAwesome6, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';
import CustomKeyBoardView from '../components/CustomKeyBoardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    const emailRef = useRef("");
    const { register } = useAuth();
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const rolRef = useRef("");

    const handleSelectRole = (role) => {
        setSelectedRole(role);
    };


    const handleRegister = async () => {
        rolRef.current = selectedRole
        console.log("rol:", rolRef.current);
        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current || !rolRef.current) {
            Alert.alert('Sign Up', "Please fill all the fields!");
            return;
        }
        setLoading(true);
        //register proccess

        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current, rolRef.current);
        setLoading(false);

        console.log('got result: ', response);
        if (!response.success) {
            Alert.alert('Sign up: ', response.msg);
        }
    }
    return (
        <CustomKeyBoardView>
            <View style={{ flex: 1 }}>
                <StatusBar style="dark" />
                <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                    <View className="items-center">
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/register.png')} />
                    </View>

                    <View className="gap-7" >
                        <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800" >Sign Up</Text>
                        <View className="gap-5 ">
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
                                <FontAwesome name='user-circle-o' size={hp(2.7)} color="green" />
                                <TextInput
                                    onChangeText={value => usernameRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder='Nickname'
                                    placeholderTextColor={'green'}
                                />
                            </View>
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
                                <FontAwesome6 name='address-card' size={hp(2.7)} color="green" />
                                <TextInput
                                    onChangeText={value => emailRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder='Email Address'
                                    placeholderTextColor={'green'}
                                />
                            </View>
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
                                <AntDesign name='profile' size={hp(2.7)} color="green" />
                                <TextInput
                                    onChangeText={value => profileRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder='Profile'
                                    placeholderTextColor={'green'}
                                />
                            </View>
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
                                <FontAwesome6 name='user-shield' size={hp(2.7)} color="green" />
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder='Password'
                                    secureTextEntry
                                    placeholderTextColor={'green'}
                                />
                            </View>
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                                <FontAwesome name='user' size={hp(2.7)} color="green" />
                                <TouchableOpacity
                                    onPress={() => handleSelectRole("Futuro adoptante")}
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        backgroundColor: selectedRole === "Futuro adoptante" ? "green" : "#fff", // Cambia el color del botón si está seleccionado
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: selectedRole === "Futuro adoptante" ? "#fff" : "green", // Cambia el color del texto si está seleccionado
                                        }}
                                    >
                                        Futuro Adoptante
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleSelectRole("Fundación")}
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        backgroundColor: selectedRole === "Fundación" ? "green" : "#fff", // Cambia el color del botón si está seleccionado
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: selectedRole === "Fundación" ? "#fff" : "green", // Cambia el color del texto si está seleccionado
                                        }}
                                    >
                                        Fundación
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className="gap-7 ">
                                <Text style={{ fontSize: hp(1.8) }}
                                    className='text-right font-semibold text-neutral-400'
                                > Forgot password? </Text>
                            </View>
                            <View>
                                {
                                    loading ? (
                                        <View className='items-center'>
                                            <Loading size={hp(8)}></Loading>
                                        </View>
                                    ) : (
                                        <View className='items-center' >
                                            <TouchableOpacity className=' rounded-2xl justify-center items-center' onPress={handleRegister} >
                                                <Text
                                                    style={{ fontSize: hp(2.9) }}
                                                    className='text-green-800 font-bold tracking-wider'
                                                >Sign Up</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>

                            <View className='flex-row justify-center gap-4' >
                                <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-600' >Already have an account? </Text>
                                <Pressable onPress={() => router.push('signIn')}>
                                    <Text style={{ fontSize: hp(1.8) }} className='font-bold text-green-800' >Sign In</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyBoardView>
    )
}