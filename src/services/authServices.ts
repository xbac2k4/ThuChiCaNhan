import {
  storeT,
} from '../utils/Http';
import { store } from '../store/store';
import { doneFetching, fetching } from '../store/reducer/commonReducer';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const register = async (params: any) => {
  store.dispatch(fetching());
  try {

  } catch (error: any) {
    return Promise.reject(error);
  } finally {
    store.dispatch(doneFetching());
  }
};


export const getMe = async () => {
  try {

  } catch (error: any) {
    return false;
  }
};

export const logout = async () => {
  try {
    const authInstance = getAuth();
    await Promise.all([
      signOut(authInstance),
      GoogleSignin.signOut(),
    ])
  } catch (error: any) {
    return Promise.reject(error);
  } finally {
    await storeT.removeToken();
  }
};
