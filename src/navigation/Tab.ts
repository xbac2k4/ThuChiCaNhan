import Icons from "../common/icons";
import { TabScreens } from "../common/type";
import Home from "../screens/home/HomeScreen";
import Statistical from "../screens/statistical/StatisticalScreen";
import Transaction from "../screens/transaction/TransactionScreen";
import ProfileScreen from "screens/profiles/ProfileScreen";
import EmptyScreen from "@components/base/Empty";

export const Tab: TabScreens[] = [
  {
    component: Home,
    key: 'home',
    name: 'home-tab',
    options: {
      tabBarLabel: 'Tổng quan',
      title: 'Tổng quan',
      headerShown: false,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.over_view,
      },
    },
  },
  {
    component: Transaction,
    key: 'transaction',
    name: 'transaction-tab',
    options: {
      tabBarLabel: 'Thu - chi',
      title: 'Thu - chi',
      headerShown: false,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.list_bulleted,
      },
    },
  },
  {
    component: EmptyScreen,
    key: 'add',
    name: 'add',
    options: {
      tabBarLabel: '',
      title: '',
      headerShown: false,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.chart_bar,
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
      headerShown: false,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.chart_bar,
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
      headerShown: false,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.profile,
      },
    },
  },
];