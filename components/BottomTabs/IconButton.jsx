import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ICON_LIBRARIES = {
    Entypo: require('react-native-vector-icons/Entypo').default,
    EvilIcons: require('react-native-vector-icons/EvilIcons').default,
    Feather: Feather,
    FontAwesome: require('react-native-vector-icons/FontAwesome').default,
    FontAwesome5: require('react-native-vector-icons/FontAwesome5').default,
    FontAwesome6: require('react-native-vector-icons/FontAwesome6').default,
    Fontisto: require('react-native-vector-icons/Fontisto').default,
    Foundation: require('react-native-vector-icons/Foundation').default,
    Ionicons: require('react-native-vector-icons/Ionicons').default,
    MaterialCommunityIcons: MaterialCommunityIcons,
    MaterialIcons: require('react-native-vector-icons/MaterialIcons').default,
    Octicons: require('react-native-vector-icons/Octicons').default,
    SimpleLineIcons: require('react-native-vector-icons/SimpleLineIcons').default,
    Zocial: require('react-native-vector-icons/Zocial').default,
};
const IconButton = ({
    icon,
    iconFamily = 'Feather',
    variant = 'contained',
    size = 'medium',
    iconColor = 'black',
    roundness = 'medium',
    style = {},
    onPress,
    ...rest
}) => {
    const Icon = ICON_LIBRARIES[iconFamily];
    const [pressed, setPressed] = useState(false);
    const iconSize = size === 'big' ? 24 : size === 'medium' ? 16 : 12;
    const buttonSize = size === 'big' ? 48 : size === 'medium' ? 36 : 24;

    const buttonStyles = [
        styles.button,
        styles[`${variant}Button`],
        styles[`${roundness}Roundness`],
        { width: buttonSize, height: buttonSize },
        style,
    ];

    return (
        <Pressable
            {...rest}
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={({ pressed }) => [
                buttonStyles,
                pressed && styles.buttonPressed,
                pressed && styles.shadow,
            ]}>
            <Icon name={icon} size={iconSize} color={pressed ? 'blue' : 'blue'} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        opacity: 0.9,
        // color:  '#fff',
    },
    containedButton: {
        backgroundColor: '#2196F3',
    },
    textButton: {
        backgroundColor: 'transparent',
        // color: '#000000',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2196F3',
    },
    fullRoundness: {
        borderRadius: 100,
    },
    mediumRoundness: {
        borderRadius: 20,
    },
    smallRoundness: {
        borderRadius: 10,
    },
    shadow: {
        shadowColor: '#00',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
});