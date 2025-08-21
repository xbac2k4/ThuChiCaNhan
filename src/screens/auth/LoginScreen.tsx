import Block from '../../components/base/Block';
import { Dimensions, ImageBackground, ScrollView, StyleSheet } from 'react-native';
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
import IconMT from '../../components/icon/IconMT';
import { Platform } from 'react-native';
import Button from '../../components/base/Button';
import React from 'react';
import images from 'constants/images';
import PhoneInput from 'components/base/PhoneInput';

const LoginScreen: React.FC<NavigationScreenProps> = memo(({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [isPass, setIsPass] = useState<boolean>(false);
  const [ENDPOINT, setENPOINT] = useState<string | null>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  return (
    <ImageBackground
      source={images.bg_login}
      style={{ flex: 1 }}
      resizeMode="contain">
      <ScrollView
        style={{
          padding: 10,
        }}
        keyboardShouldPersistTaps={'handled'}>
        <Block flex={1}>
          <Block p={10} flex={1}>
            <Block style={{ width: '100%', marginBottom: 20 }}>
              <Block center flex={1}>
                <Block pb={10}>
                  <Text style={{ color: colors.BLACK, fontSize: fontSizes.FONT_28, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
                </Block>
                <Block pb={30}>
                  <Text style={{ color: colors.GRAY, fontSize: fontSizes.FONT_16 }}>Đăng nhập với số điện thoại của bạn</Text>
                </Block>
              </Block>

              <Spacer width={0} height={40} />
              <Block style={styles.labelText}>
                <PhoneInput
                  onChangeValue={value => {}}
                  value={''}
                  error={{
                    title: 'Tên đăng nhập không để trống',
                    isError: isName,
                  }} />
              </Block>
              <Spacer width={0} height={5} />
              <Block style={styles.labelText}>
                <InputLabel
                  onChangeValue={value => {}}
                  textValue={''}
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
                onPress={() => {}}
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
              <Text style={{ color: colors.GRAY2 }}>Copyright</Text> 
              Xuân Bắc
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
    </ImageBackground>
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
    width: '100%',
  },
  t1: {
    color: '#fff',
    fontSize: fontSizes.BASE,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
