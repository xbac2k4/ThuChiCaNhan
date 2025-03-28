import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParamList, DrawerParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './helper';
import Home from '../screens/home/home';
import Statistical from '../screens/statistical/statistical';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StatusBar, Platform, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import Transaction from '../screens/transaction/transaction';

const AppStack = createNativeStackNavigator<AppParamList>();
const DrawerStack = createDrawerNavigator<DrawerParamList>();
const CustomDrawer = (props: any) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhoc24.vn%2Fcau-hoi%2Fai-co-hinh-anh-ve-thien-nhien-khong-cho-minh-vi-minh-muon-ve-nhung-khong-biet-hinh-anh-nao.864321554633&psig=AOvVaw2Rb1UoR-p7DV6pv3VwPIC0&ust=1743151517662000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCdoMnvqYwDFQAAAAAdAAAAABAp' }}
                    style={styles.imageAvatar}
                />
                <View>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Tên người dùng</Text>
                    <Text style={{ fontSize: 10, color: 'gray' }}>email@example.com</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};
const MyAppDrawer: React.FC = () => {
    return (
        <DrawerStack.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveTintColor: colors.GREEN,
                drawerLabelStyle: {
                    fontSize: 14,
                    color: colors.BLACK
                },
            }}>
            <DrawerStack.Screen
                name="HOME"
                component={Home}
                options={{
                    drawerLabel: 'Trang chủ',
                    title: 'Trang chủ',
                    // drawerIcon: ({ color, size }) => (
                    //     <Icon name="map" size={size} color={color} />
                    // ),
                }}
            />
            <DrawerStack.Screen
                name="STATISTICAL"
                component={Statistical}
                options={{
                    drawerLabel: 'Thống kê',
                    title: 'Thống kê'
                    // drawerIcon: ({ color, size }) => (
                    //     <Icon name="account" size={size} color={color} />
                    // ),
                }}
            />
            <DrawerStack.Screen
                name="TRANSACTION"
                component={Transaction}
                options={{
                    drawerLabel: 'Các giao dịch',
                    title: 'Các giao dịch',
                    // drawerIcon: ({ color, size }) => (
                    //     <Icon name="map" size={size} color={color} />
                    // ),
                }}
            />
        </DrawerStack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar
                barStyle={Platform.select({
                    ios: 'light-content',
                    android: 'dark-content',
                })}
                backgroundColor={'white'}
            />
            <AppStack.Navigator
                initialRouteName="MyAppDrawer"
                screenOptions={{
                    headerShown: false,
                }}>
                <AppStack.Screen
                    name="MyAppDrawer"
                    component={MyAppDrawer}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        // backgroundColor: 'green',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageAvatar: {
        width: 40,
        height: 40,
        marginRight: 5,
        borderRadius: 35,
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: 'black'
    }
})