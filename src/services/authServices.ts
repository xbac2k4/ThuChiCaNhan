import {
  storeT,
} from '../utils/Http';
import { store } from '../store/store';
import { doneFetching, fetching } from '../store/reducer/CommonReducer';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import logger from 'helper/logger';

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
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        phoneNumber: user?.phoneNumber,
        emailVerified: user?.emailVerified,
      };
    } else {
      return null;
    }
  } catch (error: any) {
    logger.error("Lỗi getMe:", error);
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
