import Block from '../../components/base/Block';
import Text from '../../components/base/Text';
import {colors, fontSizes} from '../../constants/theme';
import {memo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Modal} from 'react-native-ui-lib';

type ModalTakePictureType = {
  isShow: boolean;
  setShow: (bool: boolean) => void;
  setImage: (image: any) => void;
  isCrop?: boolean;
  multiple?: boolean;
  libraryDeny?: boolean;
};
const ModalTakePicture = ({
  isShow,
  setShow,
  setImage,
  isCrop,
  multiple,
  libraryDeny,
}: ModalTakePictureType) => {
  const onTakePicture = async () => {
    try {
      const response = await ImageCropPicker.openCamera({
        mediaType: 'photo',
        compressImageMaxWidth: 720,
        compressImageMaxHeight: 980,
        cropping: isCrop ? true : false,
        useFrontCamera: isCrop ? true : false,
        forceJpg: true,
        compressImageQuality: 0.5,
      });
      setImage(response);
      // multiple && (await onTakePicture());
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
  };

  const onChoosePicture = async () => {
    try {
      const pickedImage = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        compressImageMaxWidth: 720,
        compressImageMaxHeight: 980,
        cropping: isCrop ? true : false,
        useFrontCamera: isCrop ? true : false,
        forceJpg: true,
        compressImageQuality: 0.8,
        multiple: multiple ? multiple : false,
      });

      setImage(pickedImage);
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
  };
  return (
    <Modal
      visible={isShow}
      transparent
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SafeAreaView style={{flex: 1}}>
        <Block
          flex={1}
          onPress={() => setShow(false)}
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Block flex={1} />
          <Block
            mh={10}
            borderRadius={10}
            style={{backgroundColor: colors.WHITE}}>
            <Block height={70} center middle onPress={() => onTakePicture()}>
              <Text style={styles.text}>Chụp ảnh</Text>
            </Block>
            {libraryDeny ? null : (
              <Block
                borderTop
                center
                middle
                height={70}
                onPress={() => onChoosePicture()}>
                <Text style={styles.text}>Chọn ảnh từ máy</Text>
              </Block>
            )}
          </Block>

          <Block
            mh={10}
            borderRadius={5}
            ph={20}
            mv={20}
            style={{backgroundColor: colors.WHITE}}
            onPress={() => setShow(false)}>
            <Block pv={15} center middle>
              <Text
                style={{
                  ...styles.text,
                  color: colors.ERROR,
                  fontWeight: '700',
                }}>
                Đóng
              </Text>
            </Block>
          </Block>
        </Block>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(ModalTakePicture, isEqual);

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.FONT_16,
    fontWeight: 'bold',
  },
});
