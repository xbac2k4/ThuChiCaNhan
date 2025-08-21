import { StyleSheet, Text, View, Animated, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationScreenProps } from '../../common/type';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from '../../components/base/Block';
import Skeleton from '../../components/base/Skeleton';
import FloatCircleBtn from 'components/button/FloatCircleBtn';
import Icons from 'common/icons';
import { colors } from 'constants/theme';

const WalletScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    return (
        <Block flex={1}>
            <Skeleton isLoading={false} showContent>
            </Skeleton>
            <Block absolute bottom={0} right={0} m={20}>
                <FloatCircleBtn
                    containerStyle={{ width: 60, height: 60 }}
                    bgColor={colors.BG_GREEN2}
                    iconColor='white'
                    onPress={() => { }} />
            </Block>
        </Block>
    )
}
export default memo(WalletScreen, isEqual);

const styles = StyleSheet.create({})