import Block from '../../components/base/Block';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/Responsive';
import { colors, dimensions, fontSizes } from '../../constants/theme';
import Spacer from '../../components/base/Spacer';
import { memo, useState } from 'react';
import { VERSION_NAME } from '../../constants/env';
import { NavigationScreenProps } from '../../common/type';
import Text from '../../components/base/Text';
import Icons from '../../common/icons';
import IconMT from '../../components/icon/IconMT';
import React from 'react';
import images from 'constants/images';
import ButtonLabel from 'components/base/ButtonLabel';
import { showMessage } from 'react-native-flash-message';
import { LoginUser } from 'services';


const SelectLoginScreen: React.FC<NavigationScreenProps> = memo(({ navigation }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <ImageBackground
            source={images.bg_login}
            style={{ flex: 1 }}
            resizeMode="contain">
            <Block
                center
                flex={1}
                style={{
                    padding: 10,
                }}>
                <Block flex={1} center>
                    <Block>
                        <Image source={images.logo} />
                    </Block>
                    <Spacer width={0} height={30} />
                    <Block>
                        <Text style={{ color: colors.BLACK, fontSize: fontSizes.FONT_28, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
                    </Block>
                    <Spacer width={0} height={10} />
                    <Block>
                        <Text style={{ color: colors.GRAY, fontSize: fontSizes.FONT_16 }}>Vui lòng đăng nhập để sử dụng Money care</Text>
                    </Block>
                    <Spacer width={0} height={30} />
                    <Block>
                        <ButtonLabel
                            textStyle={{ color: colors.WHITE }}
                            bg='#18DC18'
                            icon='phone'
                            title='Đăng nhập với số điện thoại'
                            onPress={() => {
                                showMessage({
                                    floating: true,
                                    message: 'Chức năng đang phát triển',
                                    type: 'warning',
                                    icon: 'warning',
                                    duration: 5000,
                                });
                            }} />
                    </Block>
                    <Block>
                        <ButtonLabel
                            textStyle={{ color: colors.WHITE }}
                            bg='#2C84F6'
                            icon='facebook'
                            title='Đăng nhập với Facebook'
                            onPress={() => {
                                showMessage({
                                    floating: true,
                                    message: 'Chức năng đang phát triển',
                                    type: 'warning',
                                    icon: 'warning',
                                    duration: 5000,
                                });
                            }} />
                    </Block>
                    <Block>
                        <ButtonLabel
                            textStyle={{ color: colors.BLACK }}
                            iconColor={colors.BLACK}
                            borderColor={colors.GRAY2}
                            bg={colors.WHITE}
                            icon='google'
                            title='Đăng nhập với Google'
                            onPress={() => {
                                LoginUser({
                                    method: 'google',
                                });
                            }} />
                    </Block>
                </Block>
            </Block>
            <Block
                center
                middle
                pb={10}
                onPress={() => {
                    setVisible(!visible);
                }}>
                <Text style={{ color: colors.GRAY }}>Phiên bản {VERSION_NAME}</Text>
                <Block row center middle>
                    <IconMT name={Icons.copyright} size={16} color={colors.GRAY} />
                    <Text
                        style={{
                            fontSize: fontSizes.FONT_16,
                            fontWeight: '500',
                            color: colors.BLACK,
                        }}>
                        <Text style={{ color: colors.GRAY }}>Copyright</Text> Xuân Bắc
                    </Text>
                </Block>
            </Block>
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
        width: '90%',
    },
    t1: {
        color: '#fff',
        fontSize: fontSizes.BASE,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
});

export default SelectLoginScreen;
