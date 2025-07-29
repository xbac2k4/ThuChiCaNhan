import Icons from 'common/icons';
import Block from 'components/base/Block';
import Text from 'components/base/Text';
import IconMT from 'components/icon/IconMT';
import ModalTakePicture from 'components/modal/ModalTakePicture';
import { colors } from 'constants/theme';
import { ReactNode, memo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';

type PictureBtnType = {
  title?: string;
  handleSetImage: (image: any) => void;
  children?: ReactNode;
  multiple?: boolean;
  libraryDeny?: boolean;
  editable?: boolean;
};

const TakePictureBtn = ({
  title,
  handleSetImage,
  children,
  multiple,
  libraryDeny,
  editable,
}: PictureBtnType) => {
  const [showPicModal, setShowPicModal] = useState<boolean>(false);

  const isEdit = editable ?? true;

  return (
    <>
      <Block onPress={() => isEdit && setShowPicModal(true)}>
        {children ? (
          children
        ) : (
          <Block
            mt={5}
            center
            middle
            row
            style={{
              ...styles.imageContainer,
              backgroundColor: isEdit ? colors?.GRAY : colors.GRAY3
            }}
            borderRadius={8}>
            <Block center middle p={5}>
              <IconMT name={Icons.camera} size={20} color={colors.WHITE} />
            </Block>
            <Block>
              <Text
                style={{
                  color: colors.WHITE,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                {title}
              </Text>
            </Block>
          </Block>
        )}
      </Block>

      <ModalTakePicture
        key={1}
        libraryDeny={libraryDeny}
        isShow={showPicModal}
        setShow={setShowPicModal}
        setImage={handleSetImage}
        multiple={multiple}
      />
    </>
  );
};

export default memo(TakePictureBtn, isEqual);
const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
  },
});
