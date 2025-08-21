import { COMMON_PATHS } from '../navigation/Path';
import { store } from '../store/store';
import { storeT } from '../utils/Http';
import { replace } from '../utils/NavigationUtils';
import {
  logout,
} from './authServices';
import { OneSignal } from 'react-native-onesignal';
import moment from 'moment';
import { doneFetching, fetching } from '../store/reducer/commonReducer';
import { UserLogin } from '../common/type';
import { RemoveData } from '../store/reducer/AuthReducers';
import { ResetAll } from '../store/reducer/UserReducers';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import logger from 'helper/logger';


export const getNecessaryData = async () => {
  const userToken = await storeT.getToken();

  try {
    if (userToken) {
      // const res = await store.dispatch(getProfile());
      // const profile = res.payload;
      // if (!profile) {
      //   replace(COMMON_PATHS.LOGIN);
      // } else {
      //   return replace(COMMON_PATHS.MAIN);
      // }
      replace(COMMON_PATHS.MAIN);
    } else {
      await storeT.removeToken();
      replace(COMMON_PATHS.SELECT_LOGIN);
    }
  } catch (error) {
    replace(COMMON_PATHS.SELECT_LOGIN);
  }
};

const GoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();
    let token = signInResult.data?.idToken;
    if (!token) {
      token = signInResult?.data?.idToken;
    }
    if (!token) {
      throw new Error('No ID token found');
    }
    const googleCredential = GoogleAuthProvider.credential(token);
    await signInWithCredential(getAuth(), googleCredential);
    await storeT.setToken(token);
    return getNecessaryData();
  } catch (error) {
    logger.error('Google Signin error: ', error)
  }
}

export const LoginUser = async ({ method, otpCode }: UserLogin) => {
  store.dispatch(fetching());
  try {
    if (method === "google") {
      await GoogleSignIn()
    }
    const authInstance = getAuth();
    await storeT.setUser(authInstance.currentUser?.displayName || authInstance.currentUser?.phoneNumber || '');
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  } finally {
    store.dispatch(doneFetching());
  }
};

export const LogoutUser = async () => {
  store.dispatch(fetching());
  try {
    await logout();
  } catch (error) {
  } finally {
    store.dispatch(ResetAll());
    replace(COMMON_PATHS.SELECT_LOGIN);
    store.dispatch(RemoveData());
    store.dispatch(doneFetching());
  }
};
