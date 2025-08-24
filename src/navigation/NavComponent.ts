import SelectLoginScreen from 'screens/auth/SelectLoginScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SplashScreen from '../screens/auth/SplashScreen';
// import ChangePassword from '';
// import ProfileScreen from '';
import BottomBar from './BottomBar';
import WalletScreen from 'screens/wallets/WalletScreen';
import ComeInScreen from 'screens/comein/ComeInScreen';
import ComeOutScreen from 'screens/comeout/ComeOutScreen';

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
  MAIN: {
    component: BottomBar,
    options: {
      headerShown: false,
    },
  },
  WALLET_SCREEN: {
    component: WalletScreen,
    options: {
      headerShown: false,
    },
  },
  COMEIN_SCREEN: {
    component: ComeInScreen,
    options: {
      headerShown: false,
    },
  },
  COMEOUT_SCREEN: {
    component: ComeOutScreen,
    options: {
      headerShown: false,
    },
  },
};

export default COMMON_COMPONENTS;
