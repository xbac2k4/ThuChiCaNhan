import SelectLoginScreen from 'screens/auth/SelectLoginScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SplashScreen from '../screens/auth/SplashScreen';
// import ChangePassword from '';
// import ProfileScreen from '';
import DrawBar from './DrawBar';
import BottomBar from './BottomBar';

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
  SELECT_LOGIN: {
    component: SelectLoginScreen,
    options: {
      headerShown: false,
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
    component: BottomBar,
    options: {
      headerShown: false,
    },
  },
};

export default COMMON_COMPONENTS;
