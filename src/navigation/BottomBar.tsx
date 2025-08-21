import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabScreens } from "common/type";
import IconMT from "components/icon/IconMT";
import { colors, fontSizes, fontFamillies } from "constants/theme";
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare";
import { Tab } from "./Tab";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/base/Text";
import Block from "components/base/Block";
import { storeT } from "utils/Http";


const BottomTab = createBottomTabNavigator();

const CustomHeader = () => {

    return (
        <Block
            height={50}
            justifyBetween
            p={10}
            middle
            row
            bg={colors.TRANSPARENT}>
            <Block>
                <Text style={{ color: colors.GRAY, fontSize: fontSizes.FONT_16 }}>Xin chào, {storeT.getUser()}</Text>
            </Block>
            <Block row style={{ gap: 10 }}>
                <Block>
                    <IconMT name={'magnify'} color={colors.BLACK} size={24} />
                </Block>
                <Block>
                    <IconMT name={'bell'} color={colors.BLACK} size={24} />
                </Block>
            </Block>
        </Block>
    );
}

const MyBottomBar: React.FC = () => {

    const sizeIcon = 20;

    return (
        <BottomTab.Navigator
            initialRouteName={'home-tab'}
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerStyle: {
                    backgroundColor: colors.SECONDARY,
                    shadowColor: colors.SECONDARY,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                },
                header: ({ route, options }) => {
                    return <CustomHeader />;
                },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                tabBarActiveTintColor: colors.SECONDARY,
                tabBarInactiveTintColor: 'gray',
                headerTitleStyle: {
                    fontSize: fontSizes.FONT_16,
                },
                tabBarLabelStyle: {
                    fontSize: fontSizes.FONT_14,
                    fontWeight: '700',
                    ...fontFamillies.regular,
                },
                tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5 },
            }}>
            {Tab?.map((tab: TabScreens) => {
                return (
                    <BottomTab.Screen
                        component={tab.component}
                        key={tab.key}
                        name={tab.name}
                        options={{
                            tabBarLabel: tab.options.tabBarLabel,
                            title: tab.options.title,
                            headerShown: tab.options.headerShown,
                            tabBarIcon: ({ color, focused, size = sizeIcon }) => {
                                return (
                                    <IconMT
                                        name={tab.options.tabBarIcon.icon}
                                        size={size}
                                        color={color}
                                    />
                                );
                            },
                        }}
                    />
                );
            })}
        </BottomTab.Navigator>
    );
};


const BottomBar = () => {
    return <MyBottomBar />
}

export default memo(BottomBar, isEqual);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 20,
        marginHorizontal: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    addButton: {
        backgroundColor: colors.SECONDARY, // Màu xanh dương
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 15, // Đẩy nút lên trên để nó nổi bật
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});