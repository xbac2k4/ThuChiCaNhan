import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, FlatList, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationScreenProps } from '../../common/type';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from '../../components/base/Block';
import IconMT from '../../components/icon/IconMT';
import { stylesCustom } from '../../constants/styleCustom';
import Skeleton from '../../components/base/Skeleton';
import FloatBtnAdd from './components/FloatBtnAdd';

const HomeScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {

    return (
        <Block flex={1}>
            <Skeleton isLoading={false} showContent>
                {/* <FlatList
                    data={[]}
                    renderItem={() => (
                        <Block></Block>
                    )}
                    keyExtractor={item => item}
                /> */}
            </Skeleton>
        </Block>
    )
}
export default memo(HomeScreen, isEqual);

const styles = StyleSheet.create({})