import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from 'components/base/Button';
import { LogoutUser } from 'services';

const ProfileScreen = () => {
    return (
        <View>
            <Text>ProfileScreen</Text>
            <Button name="Đăng xuất" onPress={async () => {
                await LogoutUser();
            }} />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})