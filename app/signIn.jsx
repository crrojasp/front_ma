import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome6, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';
import CustomKeyBoardView from '../components/CustomKeyBoardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            
            return;
        }

        //login proccess
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        if(!response.response){
            if( !response.msg === ""){
                Alert.alert('Sign In', response.msg);
            }
        }
    }
    return (
        <CustomKeyBoardView>
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <StatusBar style="dark" />
                <View className="items-center">
                    <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.jpg')} />
                </View>

                <View className="gap-10" >
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800" >Sign In</Text>
                    <View className="gap-10 ">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
                            <Octicons name='mail' size={hp(2.7)} color="green" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Email Address'
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
                                        <TouchableOpacity className=' rounded-2xl justify-center items-center' onPress={handleLogin} >
                                            <Text
                                                style={{ fontSize: hp(2.9) }}
                                                className='text-green-800 font-bold tracking-wider'
                                            >Sign In</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>

                        <View className='flex-row justify-center gap-4' >
                            <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-600' >Don't have an account? </Text>
                            <Pressable onPress={() => router.push('signUp')}>
                                <Text style={{ fontSize: hp(1.8) }} className='font-bold text-green-800' >Sign up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyBoardView>
    )
}
