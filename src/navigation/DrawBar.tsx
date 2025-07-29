import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabScreens } from "../common/type";
import NotificationIcon from "../components/base/NotificationIcon";
import IconMT from "../components/icon/IconMT";
import { colors, fontSizes, fontFamillies } from "../constants/theme";
import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import { useEffect } from "react";
import { storeT } from "../utils/Http";
import { Tab } from "./Tab";

const Drawer = createDrawerNavigator();

const MyDrawerBar: React.FC = () => {
  const [tabRender, setTabRender] = useState<TabScreens[]>([]);
  const [appType, setApptype] = useState<string>();

  const getAppType = async () => {
    const appTypeStore = await storeT.getAppType();
    setApptype(appTypeStore ?? '');
  };

  useEffect(() => {
    getAppType();
  }, []);

  useEffect(() => {
    setTabRender(Tab);
  }, [appType]);

  if (tabRender.length === 0) return null;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.SECONDARY,
        },
        headerTintColor: 'white',
        drawerActiveTintColor: colors.SECONDARY,
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          fontSize: fontSizes.FONT_14,
          fontWeight: '700',
          ...fontFamillies.regular,
        },
      }}
    >
      {tabRender.map((tab: TabScreens) => (
        <Drawer.Screen
          key={tab.key}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.options.title,
            headerShown: tab.options.headerShown,
            drawerIcon: ({ color, size }) => {
              return (
                <IconMT
                  name={tab.options.tabBarIcon.icon}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const DrawerBar = () => {
  return <MyDrawerBar />;
};

export default memo(DrawerBar, isEqual);
