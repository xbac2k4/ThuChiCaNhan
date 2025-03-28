import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { navigate } from '../../navigator/helper'

const Statistical = () => {
    return (
        <View>
            <Button title='CLICK' onPress={() => {
                navigate('HOME')
            }} />
            <Text>statistical</Text>
        </View>
    )
}

export default Statistical

const styles = StyleSheet.create({})