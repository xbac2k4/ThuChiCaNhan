import { CommonActions, StackActions } from '@react-navigation/native';
import React, { RefObject } from 'react';

export let navigationRef: RefObject<any> = React.createRef();

function setTopLevelNavigator(navigatorRef: RefObject<any>) {
  navigationRef = navigatorRef;
}

function navigate(routeName: string, params?: object | undefined) {
  navigationRef.current?.navigate(routeName, params);
}

function getCurrentRoute(): string | undefined {
  return navigationRef.current?.getCurrentRoute()?.name;
}

function reset(routeName: string): void {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: routeName }],
  });
  navigationRef.current?.dispatch(resetAction);
}

function goBack() {
  navigationRef.current?.goBack();
}

function replace(routeName: string, params?: object | undefined) {
  //@ts-ignore
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}

function popToPush(routeName: string) {
  navigationRef.current?.dispatch(StackActions.replace(routeName));
}

export {
  navigate,
  getCurrentRoute,
  goBack,
  setTopLevelNavigator,
  reset,
  replace,
  popToPush,
};
