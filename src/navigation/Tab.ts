import Icons from "../common/icons";
import { TabScreens } from "../common/type";
import Home from "../screens/home/HomeScreen";
import Statistical from "../screens/statistical/StatisticalScreen";
import Transaction from "../screens/transaction/TransactionScreen";

export const Tab: TabScreens[] = [
  {
    component: Home,
    key: 'home',
    name: 'home-tab',
    options: {
      tabBarLabel: 'Trang chủ',
      title: 'Trang chủ',
      headerShown: true,
      tabBarIcon: {
        isNotification: false,
        icon: Icons.home,
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
        icon: Icons.message_alert,
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
        icon: Icons.message_alert,
      },
    },
  },
];