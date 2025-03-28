import * as React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(routeName: string, params = {}) {
  //@ts-ignore
  navigationRef.current?.navigate(routeName, params);
}

export function goBack() {
  //@ts-ignore
  navigationRef.current?.goBack();
}

export function replace(routeName: string) {
  //@ts-ignore
  navigationRef.current?.dispatch(StackActions.replace(routeName));
}
