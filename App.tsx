import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './src/screens/home/home'
import AppNavigator from './src/navigator/appNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
    return (
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    )
}

export default App

const styles = StyleSheet.create({})