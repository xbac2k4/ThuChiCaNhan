import { AxiosRequestConfig } from "axios";

export interface NavigationScreenProps {
  navigation?: any;
  route?: any;
}

export type AppAccess = {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
};

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showError?: boolean;
  errTitle?: string;
}


export type MDate = {
  day?: number;
  month: number;
  year: number;
};

export type CurrentTime = MDate & {
  dayOfWeek: string;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TabScreens = {
  component: React.ComponentType<any>;
  key: string;
  name: string;
  options: {
    tabBarLabel: string;
    title: string;
    headerShown: boolean;
    tabBarIcon: {
      isNotification: boolean;
      icon: string;
    };
  };
};

export type Paginate = {
  paginate: boolean;
  itemsPerPage: number;
  page: number;
  count?: number;
  total?: number;
  totalPage?: number;
};

export type BtnType = {
  onPress: () => void;
  bgColor?: string;
  iconName?: string;
  iconColor?: string;
};

export type FieldInfoType = {
  name: string;
  content: string | number;
  isShow: boolean;
};

export type UserLogin = {
  username: string;
  password: string;
  device_token?: string;
  device_id?: string;
};