import Block from 'components/base/Block';
import InputLabel from 'components/base/InputLabel';
import Spacer from 'components/base/Spacer';
import Text from 'components/base/Text';
import { colors, fontSizes } from 'constants/theme';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import Icons from 'common/icons';
import { ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';
import IconMT from 'components/icon/IconMT';
import Button from 'components/base/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type ModalType = {
  onClose: () => void;
  isShow: boolean;
  title: string;
  text: string;
  onChangeText: (val: string) => void;
  onAccept: () => void;
  chilren?: ReactNode;
};

const MyModal = ({
  onAccept,
  onChangeText,
  onClose,
  isShow,
  title,
  text,
  chilren,
}: ModalType) => {
  return (
    <Modal
      animationType="slide"
      visible={isShow}
      transparent
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Block
            flex={1}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            center
            onPress={onClose}>
            <Block
              m={20}
              p={20}
              borderRadius={10}
              style={{ backgroundColor: colors.WHITE }}
              onPress={() => { }}>
              <ScrollView>
                <Block row justifyBetween center>
                  <Block />
                  <Block center middle>
                    <Text style={{ fontSize: fontSizes.FONT_18 }}>{title}</Text>
                  </Block>
                  <Block onPress={onClose}>
                    <IconMT name={Icons.close} size={25} color={colors.ERROR} />
                  </Block>
                </Block>
                <Spacer height={20} />
                {chilren}

                <Block>
                  <InputLabel
                    title={'Lý do từ chối'}
                    onChangeValue={onChangeText}
                    textValue={text}
                    mutilLine={true}
                    containerStyle={{
                      minHeight: 80,
                      marginTop: 10,
                      maxHeight: 100,
                    }}
                  />
                </Block>
                <Block mt={10} row>
                  <Block flex={1} />
                  <Block flex={1} row>
                    <Block
                      borderRadius={5}
                      borderWidth={1}
                      mh={10}
                      borderColor={colors.GRAY2}
                      p={10}
                      onPress={onClose}>
                      <Text
                        style={{
                          fontSize: fontSizes.FONT_16,
                          color: colors.ERROR,
                        }}>
                        Đóng
                      </Text>
                    </Block>
                    <Button
                      styleBtn={{
                        borderRadius: 5,
                        backgroundColor: colors.SECONDARY,
                        flex: 1,
                      }}
                      colorText={colors.WHITE}
                      name="Ghi"
                      onPress={() => onAccept()}
                    />
                  </Block>
                </Block>
              </ScrollView>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(MyModal, isEqual);

type MyModalType = {
  isShow: boolean;
  close: () => void;
  title: string;
  des: string;
  onPress: () => void;
};

type AlertModalType = MyModalType & {
  isAlert?: boolean;
  alertColor?: string;
  children?: ReactNode;
  textActionButton?: string;
  customBtn?: ReactNode;
};
export const AlertModal = memo(
  ({
    close,
    isShow,
    title,
    des,
    onPress,
    alertColor,
    isAlert,
    children,
    textActionButton,
    customBtn,
  }: AlertModalType) => {
    return (
      <Modal
        visible={isShow}
        transparent
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Block
            flex={1}
            onPress={close}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            center
            middle>
            <Block m={20} row onPress={() => { }}>
              <Block flex={1}>
                <Block
                  borderBottomWidth={1}
                  p={20}
                  borderTLRadius={10}
                  borderTRRadius={10}
                  row
                  justifyBetween
                  style={{
                    backgroundColor: isAlert
                      ? alertColor
                        ? alertColor
                        : colors.ERROR
                      : colors.SECONDARY,
                  }}>
                  <Block>
                    <Text
                      style={{
                        color: colors.WHITE,
                        fontSize: fontSizes.FONT_20,
                        fontWeight: '600',
                      }}>
                      {title}
                    </Text>
                  </Block>
                  <Block onPress={close}>
                    <IconMT name={Icons.close} size={25} color={colors.WHITE} />
                  </Block>
                </Block>
                <Block
                  p={10}
                  borderBLRadius={10}
                  borderBRRadius={10}
                  style={{ backgroundColor: colors.WHITE }}>
                  <Block pv={10} ph={10}>
                    <Text style={{ fontSize: fontSizes.FONT_18 }}>{des}</Text>
                  </Block>
                  {children ? children : null}
                  {customBtn ? (
                    customBtn
                  ) : (
                    <Block row pv={10}>
                      <Button
                        onPress={close}
                        name="Đóng"
                        styleBtn={{
                          borderRadius: 5,
                          backgroundColor: colors?.WHITE,
                        }}
                      />
                      <Block flex={1} />

                      <Button
                        onPress={onPress}
                        name={textActionButton ? textActionButton : 'Ghi'}
                        colorText={colors?.WHITE}
                        styleBtn={{
                          borderRadius: 5,
                          backgroundColor: colors.SECONDARY,
                        }}
                      />
                    </Block>
                  )}
                </Block>
              </Block>
            </Block>
          </Block>
        </SafeAreaView>
      </Modal>
    );
  },
  isEqual,
);

type AlertModalBusinessType = MyModalType & {
  isOnPress?: boolean;
  isAlert?: boolean;
  children?: ReactNode;
};
export const AlertModalBusiness = memo(
  ({
    close,
    isShow,
    title,
    des,
    onPress,
    isAlert,
    children,
    isOnPress,
  }: AlertModalBusinessType) => {
    const isActionBtn = isOnPress ?? true;
    return (
      <Modal
        visible={isShow}
        transparent
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Block
            flex={1}
            onPress={close}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            center
            middle>
            <Block m={20} onPress={() => { }} width={'90%'}>
              <Block
                borderBottomWidth={1}
                p={20}
                borderTLRadius={10}
                borderTRRadius={10}
                row
                justifyBetween
                style={{
                  backgroundColor: isAlert ? colors.ERROR : colors.BUTTON_4,
                }}>
                <Block>
                  <Text
                    style={{
                      color: colors.WHITE,
                      fontSize: fontSizes.FONT_20,
                      fontWeight: '600',
                    }}>
                    {title}
                  </Text>
                </Block>
                <Block onPress={close}>
                  <IconMT name={Icons.close} size={25} color={colors.WHITE} />
                </Block>
              </Block>
              {children}
              <Block
                p={10}
                borderBLRadius={10}
                borderBRRadius={10}
                style={{ backgroundColor: colors.WHITE }}>
                <Block pv={20} ph={10}>
                  <Text style={{ fontSize: fontSizes.FONT_18 }}>{des}</Text>
                </Block>
                <Block row pv={10}>
                  <Button
                    name="ĐÓNG"
                    onPress={close}
                    styleBtn={{ backgroundColor: colors.WHITE, borderRadius: 5 }}
                    textStyle={{ color: colors.PRIMARY, fontWeight: 'bold' }}
                  />
                  <Block flex={1} />
                  {isActionBtn ? (
                    <Button
                      name="GHI"
                      onPress={onPress}
                      styleBtn={{
                        backgroundColor: colors.PRIMARY,
                        borderRadius: 5,
                      }}
                      textStyle={{ color: colors.WHITE, fontWeight: 'bold' }}
                    />
                  ) : null}
                </Block>
              </Block>
            </Block>
          </Block>
        </SafeAreaView>
      </Modal>
    );
  },
  isEqual,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
