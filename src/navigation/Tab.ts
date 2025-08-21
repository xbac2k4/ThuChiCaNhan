import Wallet from "screens/wallets/WalletScreen";
import Icons from "../common/icons";
import { TabScreens } from "../common/type";
import Home from "../screens/home/HomeScreen";
import Statistical from "../screens/statistical/StatisticalScreen";
import Transaction from "../screens/transaction/TransactionScreen";
import ProfileScreen from "screens/profiles/ProfileScreen";

export const Tab: TabScreens[] = [
  {
    component: Home,
    key: 'home',
    name: 'home-tab',
    options: {
      tabBarLabel: 'Tổng quan',
      title: 'Tổng quan',
      headerShown: true,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.over_view,
      },
    },
  },
  {
    component: Statistical,
    key: 'statistical',
    name: 'statistical-tab',
    options: {
      tabBarLabel: 'Thống kê',
      title: 'Thống kê',
      headerShown: true,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.chart_bar,
      },
    },
  },
  {
    component: Transaction,
    key: 'transaction',
    name: 'transaction-tab',
    options: {
      tabBarLabel: 'Các giao dịch',
      title: 'Các giao dịch',
      headerShown: true,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.list_bulleted,
      },
    },
  },
  {
    component: Wallet,
    key: 'wallet',
    name: 'wallet-tab',
    options: {
      tabBarLabel: 'Ví',
      title: 'Ví',
      headerShown: true,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.wallet,
      },
    },
  },
  {
    component: ProfileScreen,
    key: 'profile',
    name: 'profile-tab',
    options: {
      tabBarLabel: 'Cá nhân',
      title: 'Cá nhân',
      headerShown: true,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.profile,
      },
    },
  },
];