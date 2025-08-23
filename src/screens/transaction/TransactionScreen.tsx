import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { NavigationScreenProps } from '../../common/type'
import { memo } from 'react'
import isEqual from 'react-fast-compare'

const TransactionScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    return (
        <View>
        </View>
    )
}

export default memo(TransactionScreen, isEqual);

const styles = StyleSheet.create({})