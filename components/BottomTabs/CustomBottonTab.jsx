import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';
import { SCREEN_WIDTH } from '../../app/constants/Screen';
import usePath from '../../app/hooks/usePath';
import { getPathXCenter } from '../../app/utils/Path';
import TabItem from './TabItem';
import AnimatedCircle from './AnimatedCircle';
import { Entypo, FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CustomBottomTab = ({ state, descriptors, navigation }) => {
    const { containerPath, curvedPaths, tHeight } = usePath();
    const circleXCoordinate = useSharedValue(0);
    const progress = useSharedValue(1);
    const handleMoveCircle = (currentPath) => {
        circleXCoordinate.value = getPathXCenter(currentPath);
    };
    const selectIcon = (routeName) => {
        switch (routeName) {
            case 'Encuentra de mascota':
                return <MaterialIcons name="pets" size={24} color="black" />;
            case 'Solicitudes realizadas':
                return <Entypo name="text-document" size={24} color="black" />;
            case 'Mascotas favoritas':
                return <FontAwesome6 name="heart-circle-check" size={24} color="black" />;
            case 'Perfil de la cuenta':
                return <FontAwesome name="user-circle" size={24} color="black" />;
            case 'Registro de mascota':
                return <FontAwesome5 name="paperclip" size={24} color="black" />;
            case 'Interesados':
                return <Ionicons name="people" size={24} color="black" />;
            case 'Mascotas creadas':
                return <FontAwesome6 name="folder-open" size={24} color="black" />;
            default:
                return null; // Puedes devolver null o un ícono predeterminado en caso de que no haya un ícono definido para una pestaña
        }
    };    
    const animatedProps = useAnimatedProps(() => {
        const currentPath = interpolatePath(
            progress.value,
            Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
            curvedPaths,
        );
        runOnJS(handleMoveCircle)(currentPath);
        return {
            d: `${containerPath} ${currentPath}`,
        };
    });

    const handleTabPress = (index, tab) => {
        navigation.navigate(tab);
        progress.value = withTiming(index);
    };

    return (
        <View style={styles.tabBarContainer}>
            <Svg width={SCREEN_WIDTH} height={tHeight} style={styles.shadowMd}>
                <AnimatedPath fill={'white'} animatedProps={animatedProps} />
            </Svg>
            <AnimatedCircle circleX={circleXCoordinate} />
            <View
                style={[
                    styles.tabItemsContainer,
                    {
                        height: tHeight,
                    },
                ]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel ? options.tabBarLabel : route.name;
                    return (
                        <TabItem
                            key={index.toString()}
                            label={label}
                            icon={selectIcon(route.name)}
                            activeIndex={state.index + 1}
                            index={index}
                            onTabPress={() => handleTabPress(index + 1, route.name)}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    tabItemsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
    },
    shadowMd: {
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 3 },
    },
});

export default CustomBottomTab;