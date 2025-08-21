import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { TabScreens } from "../common/type";
import IconMT from "../components/icon/IconMT";
import { colors, fontSizes, fontFamillies } from "../constants/theme";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { Tab } from "./Tab";
import Block from "components/base/Block";
import { Image } from "react-native-ui-lib";
import Text from "components/base/Text";
import { StyleSheet } from 'react-native'
import images from "constants/images";
import Button from "components/base/Button";
import { LogoutUser } from "services";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, padding: 0, margin: 0 }} style={{ margin: 0, padding: 0 }}>
      <Block style={styles.header}>
        <Image
          source={images.logo}
          style={styles.avatar}
        />
        <Text style={styles.title}>Phiên bản v0.0.1</Text>
      </Block>
      <Block style={styles.menu}>
        <DrawerItemList {...props} />
      </Block>
      <Block>
        <Button name="Đăng xuất" onPress={async () => {
          await LogoutUser();
        }}/>
      </Block>
    </DrawerContentScrollView>
  );
};


const MyDrawerBar: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.BG_GREEN2,
        },
        headerTintColor: 'white',
        drawerActiveTintColor: colors.BG_GREEN2,
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          fontSize: fontSizes.FONT_14,
          fontWeight: '700',
          ...fontFamillies.regular,
        },
        drawerStyle: {
          width: '70%',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}>
      {Tab.map((tab: TabScreens) => (
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2196F3',
    padding: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menu: {
    paddingTop: 10,
    flex: 1,
  },
});