import Block from '../../components/base/Block';
import { Modal } from 'react-native-ui-lib';
import { Alert, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/Responsive';
import { colors, dimensions, fontSizes } from '../../constants/theme';
import Spacer from '../../components/base/Spacer';
import { memo, useEffect, useState } from 'react';
import { VERSION_NAME } from '../../constants/env';
import { NavigationScreenProps, UserLogin } from '../../common/type';
import Text from '../../components/base/Text';
import Icons from '../../common/icons';
import { COMMON_PATHS } from '../../navigation/Path';
import InputLabel from '../../components/base/InputLabel';
import { Keyboard } from 'react-native';
import { LoginUser } from '../../services';
import { storeT } from '../../utils/Http';
import IconMT from '../../components/icon/IconMT';
import CBCache from '../../utils/CBCache';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/base/Button';
import React from 'react';
import logger from '../../helper/logger';

const LoginScreen: React.FC<NavigationScreenProps> = memo(({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<UserLogin>({
    username: '',
    password: '',
    device_id: '',
  });
  const [isName, setIsName] = useState<boolean>(false);
  const [isPass, setIsPass] = useState<boolean>(false);
  const [ENDPOINT, setENPOINT] = useState<string | null>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const getEndpoint = async () => {
    try {
      const url = await storeT.getURL();
      setENPOINT(url);
    } catch (error) { }
  };

  const setEndPoint = async (url: string) => {
    try {
      await storeT.setURL(url);
    } catch (error) { }
  };

  useEffect(() => {
    getEndpoint();
  }, [setEndPoint]);

  useEffect(() => {
    const isLogin = async () => {
      const LoginUser = await storeT.getUsername();
      const PasswordUser = await storeT.getPassWord();
      const data: UserLogin = {
        password: PasswordUser || '',
        username: LoginUser || '',
        device_id: CBCache.uniqueId,
      };
      setUserLogin(data);
    };
    isLogin();
  }, []);

  const handleLogin = async (data: UserLogin) => {
    Keyboard.dismiss();
    try {
      if (userLogin.username == '') {
        setIsName(true);
        return;
      }
      if (userLogin.password == '') {
        setIsPass(true);
        return;
      }
      setIsName(false);
      setIsPass(false);
      await LoginUser(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const onAlertWhenLogin = (data: UserLogin) => {
    // const isEndPoint = Urls?.find((url: any) => url?.url == ENDPOINT);
    // if (isEndPoint?.url != '') {
    //   Alert.alert(
    //     'Cảnh báo',
    //     `Bạn đang đăng nhập vào môi trường thử nghiệm ${isEndPoint?.name ?? ''
    //     }, xác nhận tiếp tục?`,
    //     [
    //       {
    //         text: 'Huỷ',
    //         onPress: () => {
    //           return;
    //         },
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'Tiếp tục',
    //         onPress: () => {
    //           handleLogin(data);
    //         },
    //       },
    //     ],
    //     { cancelable: true },
    //   );
    // } else {
    //   handleLogin(data);
    // }
    handleLogin(data);
  };

  const onChangeValue = (name: keyof UserLogin, value: String) => {
    const data = { ...userLogin, [name]: value };
    setUserLogin(data);
  };

  return (
    <LinearGradient
      colors={['#4c669f', colors.SECONDARY, colors.PRIMARY]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <ScrollView
        style={{
          padding: 10,
        }}
        keyboardShouldPersistTaps={'handled'}>
        <Block flex={1}>
          <Block p={dimensions.XL} flex={1}>
            <Block middle style={{ width: '100%', marginBottom: 20 }}>
              <Spacer height={20} />
              <Block center middle flex={1}>
                {/* <Image width={60} height={25} source={images.MERP} /> */}
                <Text
                  style={{
                    backgroundColor: colors.WHITE,
                    fontWeight: 'bold',
                    fontSize: fontSizes.FONT_24,
                    paddingHorizontal: 5,
                    color: colors.SECONDARY,
                  }}>
                  TT EBS
                </Text>
                <Spacer height={20} />
                <Text
                  style={{
                    color: colors.GRAY4,
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  THUẬN THÀNH
                </Text>

                <Spacer height={20} />
              </Block>

              <Spacer width={0} height={40} />
              <Block style={styles.labelText}>
                <InputLabel
                  onChangeValue={value => onChangeValue('username', value)}
                  textValue={userLogin.username}
                  textPlaceHolder={'Tên đăng nhập'}
                  title={'Tên đăng nhập'}
                  titleStyle={{ color: colors.WHITE }}
                  error={{
                    title: 'Tên đăng nhập không để trống',
                    isError: isName,
                  }}
                />
              </Block>
              <Spacer width={0} height={5} />
              <Block style={styles.labelText}>
                <InputLabel
                  onChangeValue={value => onChangeValue('password', value)}
                  textValue={userLogin.password}
                  textPlaceHolder={'Mật khẩu'}
                  title={'Mật khẩu'}
                  titleStyle={{ color: colors.WHITE }}
                  error={{
                    title: 'Mật khẩu không để trống',
                    isError: isPass,
                  }}
                  secureText={true}
                />
              </Block>
              <Button
                linearColors={[colors.PRIMARY, colors.SECONDARY]}
                styleBtn={styles.loginBtn}
                textStyle={{ color: colors.WHITE, textTransform: 'uppercase' }}
                onPress={() => onAlertWhenLogin(userLogin)}
                name={'Đăng nhập'}
              />
            </Block>
            {Platform.OS == 'ios' ? (
              <Block
                pb={10}
                center
                middle
                onPress={() => navigation.navigate(COMMON_PATHS.REGISTER)}>
                <Text
                  style={{
                    color: colors.BUTTON_4,
                    textDecorationLine: 'underline',
                    fontSize: fontSizes.FONT_16,
                    fontWeight: '700',
                  }}>
                  Đăng ký
                </Text>
              </Block>
            ) : null}
          </Block>
        </Block>
        <Block
          row
          center
          middle
          onPress={() => {
            if (visible) {
              // navigation.navigate(COMMON_PATHS.WEBVIEW);
            }
          }}>
          <Block row center middle pt={10}>
            <IconMT name={Icons.copyright} size={16} color={colors.GRAY2} />
            <Text
              style={{
                fontSize: fontSizes.FONT_16,
                fontWeight: '500',
                color: colors.WHITE,
              }}>
              <Text style={{ color: colors.GRAY2 }}>Copyright</Text> THUẬN THÀNH
              EBS
            </Text>
          </Block>
        </Block>
      </ScrollView>

      {!isKeyboardVisible ? (
        <Block
          center
          middle
          onPress={() => {
            setVisible(!visible);
          }}>
          <Text style={{ color: colors.GRAY4 }}>{ENDPOINT}</Text>
          <Text style={{ color: colors.GRAY4 }}>Phiên bản {VERSION_NAME}</Text>
        </Block>
      ) : (
        <></>
      )}
    </LinearGradient>
  );
});

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: verticalScale(150),
  },
  textInput: {
    height: scale(60),
    marginTop: dimensions.MEDIUM,
    width: '100%',
    backgroundColor: colors.GRAY4,
  },
  loginBtn: {
    width: '90%',
    marginTop: scale(dimensions.LARGE),
    backgroundColor: colors.PRIMARY,
    // padding: dimensions.LARGE - 5,
    borderRadius: 46,
    elevation: 3,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    width: '90%',
  },
  t1: {
    color: '#fff',
    fontSize: fontSizes.BASE,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
