import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationScreenProps } from '../../common/type';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from '../../components/base/Block';
import IconMT from '../../components/icon/IconMT';
import { stylesCustom } from '../../constants/styleCustom';
import Skeleton from '../../components/base/Skeleton';
import FloatBtnAdd from './components/FloatBtnAdd';

const users = [
    {
        user_id: 'U001',
        full_name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        password: '123456',
        created_at: '2025-07-01T08:00:00Z',
    },
    {
        user_id: 'U002',
        full_name: 'Trần Thị B',
        email: 'tranthib@example.com',
        password: 'abcdef',
        created_at: '2025-07-15T09:30:00Z',
    },
    {
        user_id: 'U003',
        full_name: 'Lê Văn C',
        email: 'levanc@example.com',
        password: 'qwerty',
        created_at: '2025-07-20T10:15:00Z',
    },
    {
        user_id: 'U004',
        full_name: 'Phạm Thị D',
        email: 'phamthid@example.com',
        password: 'zxcvbn',
        created_at: '2025-07-25T14:45:00Z',
    },
];


const HomeScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    const { t } = useTranslation('home');
    const [isOpen, setIsOpen] = useState(false);
    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;
    const [data, setData] = useState([]);

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;
        Animated.stagger(100, [
            Animated.timing(anim1, { toValue, duration: 200, useNativeDriver: true }),
            Animated.timing(anim2, { toValue, duration: 200, useNativeDriver: true })
        ]).start();

        setIsOpen(!isOpen);
    };

    const renderItem = ({ item }: any) => {
        return (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>ID: {item.user_id}</Text>
                <Text>Username: {item.full_name}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Password: {item.password}</Text>
                <Text>Created At: {item.created_at}</Text>
            </View>
        )
    };

    return (
        <Block flex={1}>
            <Skeleton isLoading={false} showContent>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item.user_id.toString()}
                />
            </Skeleton>
            <Block m={20}>
                <FloatBtnAdd />
            </Block>
        </Block>
    )
}
export default memo(HomeScreen, isEqual);

const styles = StyleSheet.create({})