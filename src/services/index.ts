import { COMMON_PATHS } from '../navigation/Path';
import { store } from '../store/store';
import { storeT } from '../utils/Http';
import { replace } from '../utils/NavigationUtils';
import {
  logout,
} from './AuthServices';
import moment from 'moment';
import { doneFetching, fetching } from '../store/reducer/CommonReducer';
import { UserLogin } from '../common/type';
import { RemoveData } from '../store/reducer/AuthReducers';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import logger from 'helper/logger';
import { getListWalletThunk } from 'store/thunk/WalletThunk';
import { getProfile } from 'store/thunk/AuthThunk';

const HandleGetInitData = async (isLoading?: boolean) => {
  isLoading && store.dispatch(fetching());
  try {
    const dispatch = [
      store.dispatch(getListWalletThunk()),
    ];
    await Promise.all(dispatch);
    return replace(COMMON_PATHS.MAIN);
  } catch (error) {
    logger.error(error);
  }
  finally {
    isLoading && store.dispatch(doneFetching());
  }
};

export const getNecessaryData = async () => {
  const userToken = await storeT.getToken();
  try {
    if (userToken) {
      const res = await store.dispatch(getProfile());
      
      const profile = res.payload;
      if (!profile) {
        replace(COMMON_PATHS.LOGIN);
      } else {
        await HandleGetInitData();
      }
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
    replace(COMMON_PATHS.SELECT_LOGIN);
    store.dispatch(RemoveData());
    store.dispatch(doneFetching());
  }
};
