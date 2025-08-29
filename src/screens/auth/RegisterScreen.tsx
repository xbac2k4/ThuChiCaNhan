import Block from '../../components/base/Block';
import Button from '../../components/base/Button';
import SectionInput from '../../components/base/SectionInput';
import Text from '../../components/base/Text';
import { colors, fontSizes } from '../../constants/theme';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ScrollView } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { register } from '../../services/AuthServices';
import LinearGradient from 'react-native-linear-gradient';

type RegisterType = {
  username: string;
  password: string;
  confirmpassword: string;
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Không được để trống'),
  password: yup
    .string()
    .required('Không được để trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmpassword: yup
    .string()
    .required('Không được để trống')
    .test('passwords-match', 'Mật khẩu xác nhận không khớp', function (value) {
      return this.parent.password === value;
    }),
});

const RegisterScreen = () => {
  const handleOnSubmit = async (values: RegisterType) => {
    const validate = await validationSchema
      .validate(values)
      .then(() => true)
      .catch((error: any) => {
        showMessage({
          floating: true,
          message: 'Có lỗi xảy ras',
          description: `${error}`,
          type: 'danger',
          icon: 'danger',
          duration: 60000,
        });
        return false;
      });
    if (validate) {
      const params = {
        ...values,
        group_id: 51,
      };
      register(params);
    }
  };

  return (
    <LinearGradient
      colors={[colors.SECONDARY, colors.PRIMARY]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <ScrollView style={{ width: '100%' }}>
        <Block flex={1} center middle minHeight={150}>
          <Text
            style={{
              fontSize: fontSizes.FONT_20,
              fontWeight: 'bold',
              color: colors.WHITE,
            }}>
            THUẬN THÀNH ENCO
          </Text>
          <Block p={20}>
            <Text
              style={{
                fontSize: fontSizes.FONT_14,
                fontWeight: '500',
                color: colors.WHITE,
                textAlign: 'center',
              }}>
              Tạo tài khoản
            </Text>
          </Block>
        </Block>

      </ScrollView>
    </LinearGradient>
  );
};

export default memo(RegisterScreen, isEqual);
