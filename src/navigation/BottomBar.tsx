import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabScreens } from "common/type";
import IconMT from "components/icon/IconMT";
import { colors, fontSizes, fontFamillies, bgColors } from "constants/theme";
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare";
import { Tab } from "./Tab";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/base/Text";
import Block from "components/base/Block";
import { storeT } from "utils/Http";
import { Modal, View } from "react-native-ui-lib";
import * as Animatable from 'react-native-animatable';
import ModalBottom from '@components/modal/ModalBottom'
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from "utils/NavigationUtils";
import { COMMON_PATHS } from "./Path";


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

const MyTabBar = ({ state, descriptors, navigation }: any) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    const modalOptions = [
        {
            title: "Tiền thu",
            onPress: () => {
                navigate(COMMON_PATHS.COMEIN_SCREEN);
            },
        },
        {
            title: "Tiền chi",
            onPress: () => {
                navigate(COMMON_PATHS.COMEOUT_SCREEN);
            },
        }
    ];

    return (
        <Block style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                console.log('options', options);

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                if (route.name === 'add') {
                    return (
                        <Block key={route.key} style={styles.centerButtonContainer}>
                            <LinearGradient
                                colors={[bgColors.BG_BLUE, bgColors.BG_BLUE1]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    ...styles.centerButton,
                                    ...styles.shadow,
                                }}>
                                <TouchableOpacity
                                    style={{ ...styles.centerButton, bottom: 0 }}
                                    onPress={showModal}>
                                    <IconMT name="plus" size={30} color="#FFFFFF" />
                                </TouchableOpacity>
                            </LinearGradient>
                            <ModalBottom title="Lựa chọn" visible={isModalVisible} onClose={hideModal} options={modalOptions} />
                        </Block>
                    );
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={() => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        }}
                        style={styles.tabButton}>
                        {options.tabBarIcon &&
                            options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? bgColors.BLUE_BASE : colors.GRAY2,
                                size: 26,
                            })}
                        <Text style={{ fontWeight: 'bold', color: isFocused ? bgColors.BLUE_BASE : 'gray' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </Block>
    );
}

const MyBottomBar: React.FC = () => {

    const sizeIcon = 20;

    return (
        <BottomTab.Navigator
            tabBar={props => {
                return <MyTabBar {...props} />
            }}
            initialRouteName={'home-tab'}
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerStyle: {
                    backgroundColor: bgColors.BLUE_BASE,
                    shadowColor: bgColors.BLUE_BASE,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                },
                header: ({ route, options }) => {
                    return <CustomHeader key={route.key} />;
                },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                tabBarActiveTintColor: bgColors.BLUE_BASE,
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
            {Tab?.map((tab: TabScreens, index) => {
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
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 28,
    },
    shadow: {
        shadowColor: '#2F99E0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalOption: {
        width: '100%',
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    modalOptionText: {
        textAlign: 'center',
        fontSize: 16,
    },
    modalCancel: {
        marginTop: 10,
        paddingVertical: 15,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
    },
    modalCancelText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});