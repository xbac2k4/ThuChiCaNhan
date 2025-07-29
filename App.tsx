/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {
  AppState,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage, {
  hideMessage,
  showMessage,
} from 'react-native-flash-message';
import Loading from './src/components/loading/Loading';
import NetInfo from '@react-native-community/netinfo';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import 'react-native-reanimated';

function App(): JSX.Element {
  const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize('f83a0605-692f-421f-81a3-22c784da0ed8');
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
      event.notification.display();
      console.log('---------- Có thông báo -----------');
    });
    OneSignal.Notifications.clearAll;

    const unsubscribeNetwork = NetInfo.addEventListener(
      handleConnectivityChange,
    );
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      if (unsubscribeNetwork) {
        unsubscribeNetwork();
      }
    };
  }, []);

  const handleAppStateChange = (state: any) => {
    appState.current = state;
  };

  const handleConnectivityChange = (state: any) => {
    if (appState.current === 'active') {
      const {isConnected} = state;
      if (!isConnected) {
        showMessage({
          message: 'Không có internet',
          description:
            'Không có kết nối internet. Vui lòng cài đặt mạng Wifi/3G/4G!',
          type: 'danger',
          icon: 'danger',
          autoHide: false,
        });
      } else {
        hideMessage();
      }
    }
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ProviderApp />
      </SafeAreaProvider>
    </Provider>
  );
}

const ProviderApp = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <React.Fragment>
            <StatusBar
              barStyle={Platform.select({
                android: 'light-content',
                ios: 'light-content',
              })}
              backgroundColor="black"
            />
            {Platform.select({
              ios: (
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                  <AppNavigation />
                </KeyboardAvoidingView>
              ),
              android: <AppNavigation />,
            })}
            <Loading />
            <FlashMessage position="top" floating duration={10000} />
          </React.Fragment>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default App;

const styles = StyleSheet.create({});