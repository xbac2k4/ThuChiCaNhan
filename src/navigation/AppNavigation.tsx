import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {memo, useCallback} from 'react';
import {navigationRef} from '../utils/NavigationUtils';
import {colors, fontFamillies, fontSizes} from '../constants/theme';
import {Platform} from 'react-native';
import {COMMON_PATHS} from './Path';
import BootSplash from 'react-native-bootsplash';
import isEqual from 'react-fast-compare';
import COMMON_COMPONENTS from './NavComponent';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  
  const renderScreens = useCallback(() => {
    const renderNavigatorScreens = (paths: any, navComponent: any) => {
      return Object.keys(paths).map(key => {
        return (
          <Stack.Screen
            component={navComponent[key].component}
            key={paths[key]}
            name={paths[key]}
            options={navComponent[key].options}
          />
        );
      });
    };

    let navigatorScreens = renderNavigatorScreens(
      COMMON_PATHS,
      COMMON_COMPONENTS,
    );
    return navigatorScreens;
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <Stack.Navigator
        initialRouteName={COMMON_PATHS.SPLASH}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.SECONDARY,
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerBackTitleStyle: fontFamillies.regular,
          headerTitleStyle: {
            ...Platform.select({
              android: fontFamillies.regular,
              ios: fontFamillies.bold,
            }),
            fontSize: fontSizes.FONT_16,
          },
          headerBackButtonDisplayMode: 'minimal'
        }}>
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AppNavigation, isEqual);
