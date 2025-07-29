import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationScreenProps } from '../../common/type'
import { memo } from 'react'
import isEqual from 'react-fast-compare'

const StatisticalScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    const { t } = useTranslation('statistical')
    return (
        <View>
            <Text>{t('navigation.statisticalTitle')}</Text>
            <Button title='CLICK' onPress={() => {
                navigation.navigate('HOME')
            }} />
        </View>
    )
}

export default memo(StatisticalScreen, isEqual);

const styles = StyleSheet.create({})