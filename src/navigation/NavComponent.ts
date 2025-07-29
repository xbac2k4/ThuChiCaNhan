import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SplashScreen from '../screens/auth/SplashScreen';
// import ChangePassword from '';
// import ProfileScreen from '';
import DrawBar from './DrawBar';

const COMMON_COMPONENTS = {
  SPLASH: {
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  REGISTER: {
    component: RegisterScreen,
    options: {
      headerTitle: 'Đăng ký tài khoản',
    },
  },
  LOGIN: {
    component: LoginScreen,
    options: {
      headerShown: false,
    },
  },
  // CHANGEPASS: {
  //   component: ChangePassword,
  //   options: {
  //     headerTitle: 'Đổi mật khẩu',
  //   },
  // },
  // PROFILE: {
  //   component: ProfileScreen,
  //   options: {
  //     headerTitle: 'Hồ sơ',
  //   },
  // },
  MAIN: {
    component: DrawBar,
    options: {
      headerShown: false,
    },
  },
};

export default COMMON_COMPONENTS;
