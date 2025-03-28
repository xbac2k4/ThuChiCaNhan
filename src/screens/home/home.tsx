import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { navigate } from '../../navigator/helper'

const Home = () => {
    return (
        <View>
            <Text>home</Text>
            <Button title='CLICK' onPress={() => {
                navigate('STATISTICAL')
            }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})