import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from 'components/base/Button';

import Block from 'components/base/Block';
import { navigate } from 'utils/NavigationUtils';
import { COMMON_PATHS } from 'navigation/Path';
import { LogoutUser } from 'services/index';

const ProfileScreen = () => {
    return (
        <Block flex={1}>
            <Button name='Ví' onPress={() => {
                navigate(COMMON_PATHS.WALLET_SCREEN);
            }}/>
            <Button name="Đăng xuất" onPress={async () => {
                await LogoutUser();
            }} />
        </Block>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})