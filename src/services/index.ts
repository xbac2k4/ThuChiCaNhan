import { COMMON_PATHS } from '../navigation/Path';
import { store } from '../store/store';
import { storeT } from '../utils/Http';
import { navigate, replace } from '../utils/NavigationUtils';
import {
  login,
  logout,
} from './authServices';
import { OneSignal } from 'react-native-onesignal';
import moment from 'moment';
import { doneFetching, fetching } from '../store/reducer/commonReducer';
import { getAvatarThunk, getProfile } from '../store/thunk/AuthThunk';
import { UserLogin } from '../common/type';
import { RemoveData } from '../store/reducer/AuthReducers';
import { ResetAll } from '../store/reducer/UserReducers';

const date = moment().utc(true);
const time = moment().utc(true).hour();

export const GetLoginAppInitData = async (
  profile: any,
  isLoading?: boolean,
) => {
  isLoading && store.dispatch(fetching());

  try {
    await store.dispatch(getAvatarThunk());
  } catch (error) {
  } finally {
    isLoading && store.dispatch(doneFetching());
  }
};

const HandleGetInitData = async (id: string, profile: any) => {
  try {
    // GetLoginAppInitData(profile);
    return replace(COMMON_PATHS.MAIN);
  } catch (error) { }
};


export const getNecessaryData = async () => {
  const userToken = await storeT.getToken();

  try {
    if (userToken) {
      const res = await store.dispatch(getProfile());
      const profile = res.payload;
      if (profile?.user?.first_login) {
        // navigate(COMMON_PATHS.CHANGEPASS);
      } else if (!profile) {
        replace(COMMON_PATHS.LOGIN);
      } else {
        OneSignal.login(`${profile.user.id}`);
        await HandleGetInitData(profile?.user?.partner_id, profile);
      }
    } else {
      await storeT.removeToken();
      replace(COMMON_PATHS.MAIN);
    }
  } catch (error) {
    replace(COMMON_PATHS.MAIN);
  }
};

export const LoginUser = async ({ username, password, device_id }: UserLogin) => {
  store.dispatch(fetching());
  try {
    await login({ username, password, device_id });
    const res = await store.dispatch(getProfile());
    const profile = res.payload;

    if (profile?.user?.first_login) {
      // navigate(COMMON_PATHS.CHANGEPASS);
    } else if (!profile) {
      replace(COMMON_PATHS.LOGIN);
    } else {
      OneSignal.login(`${profile.user.id}`);
      await HandleGetInitData(profile?.user?.partner_id, profile);
    }
  } catch (error) {
  } finally {
    store.dispatch(doneFetching());
  }
};

export const LogoutUser = async () => {
  store.dispatch(fetching());
  try {
    await logout();
    await storeT.removeAppType();
  } catch (error) {
  } finally {
    store.dispatch(ResetAll());
    replace(COMMON_PATHS.LOGIN);
    OneSignal.logout();
    store.dispatch(RemoveData());
    store.dispatch(doneFetching());
  }
};
