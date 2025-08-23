import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationScreenProps } from '../../common/type'
import { memo } from 'react'
import isEqual from 'react-fast-compare'

const StatisticalScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    return (
        <View>
        </View>
    )
}

export default memo(StatisticalScreen, isEqual);

const styles = StyleSheet.create({})