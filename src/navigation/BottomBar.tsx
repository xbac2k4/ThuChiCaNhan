// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { TabScreens } from "common/type";
// import NotificationIcon from "components/base/NotificationIcon";
// import IconMT from "components/icon/IconMT";
// import { colors, fontSizes, fontFamillies } from "constants/theme";
// import { TT_APP_TYPE } from "constants/url";
// import { memo, useEffect, useState } from "react"
// import isEqual from "react-fast-compare";
// import { storeT } from "utils/Http";
// import { CustomerTab, BusinessTab, DriverTab, WorkerTab, CheckInTab } from "./Tab";

// const Tab = createBottomTabNavigator();

// const MyBottomBar: React.FC = () => {
  
//   const sizeIcon = 20;
//   const [tabRender, setTabRender] = useState<TabScreens[]>([]);

//   const [appType, setApptype] = useState<string>();

//   const getAppType = async () => {
//     const appTypeStore = await storeT.getAppType();
//     setApptype(appTypeStore ?? '');
//   };

//   useEffect(() => {
//     getAppType();
//   }, []);

//   useEffect(() => {
//     if (appType == TT_APP_TYPE.KINHDOANH) {
//       setTabRender(BusinessTab);
//     } else if (appType == TT_APP_TYPE.LAIXE) {
//       setTabRender(DriverTab);
//     } else if (appType == TT_APP_TYPE.CONGNHAN) {
//       setTabRender(WorkerTab);
//     } else if (appType == TT_APP_TYPE.CHAMCONG) {
//       setTabRender(CheckInTab);
//     } else {
//       setTabRender(CustomerTab);
//     }
//   }, [appType]);

//   if(tabRender?.length == 0){
//     return null;
//   }

//   return (
//     <Tab.Navigator
//       initialRouteName={'home-tab'}
//       screenOptions={{
//         tabBarHideOnKeyboard: true,
//         headerStyle: {
//           backgroundColor: colors.SECONDARY,
//           shadowColor: colors.SECONDARY,
//           shadowOffset: {
//             width: 0,
//             height: 1,
//           },
//           shadowOpacity: 0.22,
//           shadowRadius: 2.22,
//           elevation: 3,
//         },
//         headerTitleAlign: 'center',
//         headerTintColor: 'white',
//         tabBarActiveTintColor: colors.SECONDARY,
//         tabBarInactiveTintColor: 'gray',
//         headerTitleStyle: {
//           fontSize: fontSizes.FONT_16,
//         },
//         tabBarLabelStyle: {
//           fontSize: fontSizes.FONT_14,
//           fontWeight: '700',
//           ...fontFamillies.regular,
//         },
//         tabBarStyle: {height: 60, paddingBottom: 5, paddingTop: 5},
//       }}>
//       {tabRender?.map((tab: TabScreens) => {
//         return (
//           <Tab.Screen
//             component={tab.component}
//             key={tab.key}
//             name={tab.name}
//             options={{
//               tabBarLabel: tab.options.tabBarLabel,
//               title: tab.options.title,
//               headerShown: tab.options.headerShown,
//               tabBarIcon: ({color, focused, size = sizeIcon}) => {
//                 if (tab.options.tabBarIcon.isNotification) {
//                   return <NotificationIcon {...{focused}} {...{color, size}} />;
//                 } else {
//                   return (
//                     <IconMT
//                       name={tab.options.tabBarIcon.icon}
//                       size={size}
//                       color={color}
//                     />
//                   );
//                 }
//               },
//             }}
//           />
//         );
//       })}
//     </Tab.Navigator>
//   );
// };


// const BottomBar = () => {
//     return <MyBottomBar />
// }

// export default memo(BottomBar,isEqual);