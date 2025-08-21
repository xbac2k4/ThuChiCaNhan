import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_CODE} from '../constants/url';
import {showMessage} from 'react-native-flash-message';
import {COMMON_PATHS} from '../navigation/Path';
import {navigate} from './NavigationUtils';
import {CustomAxiosRequestConfig} from '../common/type';
import {parseJsonObject} from './JsonToFormData';
import logger from '../helper/logger';

class Store {
  __token = '';
  __refresh_token = '';
  __username = '';

  //Token
  async getToken() {
    return (
      this.__token || (await AsyncStorage.getItem('app_token'))
    );
  }

  async setToken(token: string) {
    this.__token = token;
    await AsyncStorage.setItem('app_token', token);
  }

  async removeToken() {
    this.__token = '';
    await AsyncStorage.removeItem('app_token');
  }
  // User
  async getUser() {
    return (
      this.__username || (await AsyncStorage.getItem('app_username'))
    );
  }

  async setUser(username: string) {
    this.__username = username;
    await AsyncStorage.setItem('app_username', username);
  }

  async removeUser() {
    this.__username = '';
    await AsyncStorage.removeItem('app_username');
  }
}

export const storeT = new Store();

export const CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const handleShowErrTitle = (title: string): CustomAxiosRequestConfig => {
  const showTitle: CustomAxiosRequestConfig = {
    errTitle: title,
  };
  return showTitle;
};

export const notShowError: CustomAxiosRequestConfig = {
  showError: false,
};

export function isNetworkError(err: {isAxiosError: any; response: any}) {
  return !!err.isAxiosError && !err.response;
}

export function handleError(error: {isAxiosError: any; response: any}) {
  if (isNetworkError(error)) {
    showMessage({
      message: 'Không có kết nối mạng!',
      type: 'danger',
    });

    return 1;
  }
  return 0;
}

const http = axios.create({
  baseURL: '',
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  async config => {
    const {isConnected} = await NetInfo.fetch();
    if (!isConnected) {
      showMessage({
        floating: true,
        message: 'Không có internet',
        description:
          'Không có kết nối internet. Vui lòng cài đặt mạng Wifi/3G/4G!',
        type: 'danger',
        icon: 'danger',
        duration: 60000,
        autoHide: false,
      });
    } else {
      const token = await storeT.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return Promise.resolve(config);
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    logger.error(
      error?.request?.status +
        '_' +
        error?.config?.method +
        '_' +
        error?.request?._url +
        ' \n',
      error?.request?._response,
    );
    const serverStatus = error?.status
      ? error?.status
      : error?.config?.status
      ? error?.config?.status
      : error?.response?.status;
    const config = error.config || {};
    const shouldShowError = config?.showError !== false;
    const errorUrl = error?.config?.url ? '_' + error?.config?.url : '';
    // show lỗi từ server
    if (serverStatus === 401) {
      // Xử lý lỗi token hết hạn
      showMessage({
        message: 'Vui lòng đăng nhập lại',
        description:
          'Tài khoản của bạn được đăng nhập từ thiết bị khác hoặc phiên làm việc của bạn đã dừng',
        type: 'danger',
        icon: 'danger',
        duration: 60000,
      });

      // Đăng xuất
      await storeT.removeToken();
      navigate(COMMON_PATHS.LOGIN);
    } else if (serverStatus >= 500) {
      const errorMesg =
        'Đã xảy ra lỗi trong quá trình xử lý yêu cầu của bạn. \n' +
        error?.message +
        '\n';
      showMessage({
        message: 'Lỗi hệ thống',
        description: errorMesg + errorUrl,
        type: 'danger',
        icon: 'danger',
        duration: 60000,
      });
    } else {
      if (shouldShowError) {
        let title = config?.errTitle ?? 'Có lỗi xảy ra';
        const data = parseJsonObject(error?.request?._response);
        let errorMesg = data?.message ? data?.message : error?.message;
        if (error?.code == 'ERR_NETWORK') {
          title = 'Không có kết nối internet!';
          errorMesg =
            'Vui lòng kiểm tra lại Wi-Fi hoặc dữ liệu di động để tiếp tục sử dụng ứng dụng.';
        }
        showMessage({
          message: title,
          description: errorMesg ?? errorUrl,
          type: error?.code == 'ERR_NETWORK' ? 'warning' : 'danger',
          icon: error?.code == 'ERR_NETWORK' ? 'warning' : 'danger',
          duration: 60000,
        });
      }
    }
    return Promise.reject(error);
  },
);

export default http;
