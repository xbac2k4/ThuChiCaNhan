import {COMMON_PATHS} from '../navigation/Path';
// import {APP_KEY, COMMON_ROUTE} from '../constants/url';
import http, {
  CONFIG,
  handleShowErrTitle,
  notShowError,
  storeT,
} from '../utils/Http';
import {showMessage} from 'react-native-flash-message';
import {
  UserLogin,
} from '../common/type';
import {store} from '../store/store';
import {goBack, navigate} from '../utils/NavigationUtils';
import {doneFetching, fetching} from '../store/reducer/commonReducer';
import { APP_KEY, COMMON_ROUTE } from '../constants/url';

export const register = async (params: any) => {
  store.dispatch(fetching());
  try {
    const ENDPOINT = await storeT.getURL();
    const response = await http.post(
      `${ENDPOINT}${COMMON_ROUTE.REGISTER}`,
      params,
      handleShowErrTitle('Tạo mới thất bại'),
    );
    showMessage({
      floating: true,
      message: 'Tạo tài khoản thành công',
      description: '',
      icon: 'success',
      type: 'success',
    });
    goBack();
    return response;
  } catch (error: any) {
    return Promise.reject(error);
  } finally {
    store.dispatch(doneFetching());
  }
};

export const login = async ({username, password, device_id}: UserLogin) => {
  try {
    const ENDPOINT = await storeT.getURL();
    const res = await http.post(
      `${ENDPOINT}${COMMON_ROUTE.DANG_NHAP}`,
      {
        login: username,
        password,
        key: APP_KEY,
        device_id: device_id,
      },
      handleShowErrTitle('Đăng nhập thất bại!'),
    );

    const token = res?.data?.access_token;
    await storeT.setToken(token);
    await storeT.setUsername(username);
    await storeT.setPassWord(password);
    return token;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getMe = async () => {
  try {
    const ENDPOINT = await storeT.getURL();
    const response = await http.get(`${ENDPOINT}${COMMON_ROUTE.ME}`);
    return response.data;
  } catch (error: any) {
    return false;
  }
};

export const logout = async () => {
  try {
    const ENDPOINT = await storeT.getURL();
    const response = await http.post(
      `${ENDPOINT}${COMMON_ROUTE.DANG_XUAT}`,
      notShowError,
    );
    return response;
  } catch (error: any) {
    return Promise.reject(error);
  } finally {
    await storeT.removeToken();
  }
};

export const getAvatar = async () => {
  try {
    const ENDPOINT = await storeT.getURL();
    const response = await http.get(
      `${ENDPOINT}${COMMON_ROUTE.GET_AVATAR}`,
      notShowError,
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getAppAccess = async (): Promise<
  {id?: number; name?: string}[]
> => {
  try {
    const ENDPOINT = await storeT.getURL();
    const response = await http.get(`${ENDPOINT}${COMMON_ROUTE.APP_ACCESS}`);
    return response.data;
  } catch (error: any) {
    navigate(COMMON_PATHS.LOGIN);
    return Promise.reject();
  }
};
