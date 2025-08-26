import Icons from 'common/icons';
import Block from 'components/base/Block';
import IconMT from 'components/icon/IconMT';
import { colors } from 'constants/theme';
import React, { memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Modal } from 'react-native';
import Zoomable from 'components/animation/Zoomable';
import { StyleSheet } from 'react-native';
import { storeT } from 'utils/Http';

type PictureType = {
  imagUrl?: string;
  isShow: boolean;
  close: () => void;
};

const ModalPicture = ({ imagUrl, isShow, close }: PictureType) => {

  const insets = useSafeAreaInsets();
  return (
    <Modal visible={isShow}>
      <SafeAreaView style={{ flex: 1 }}>
        <Block flex={1} style={{ backgroundColor: colors.BLACK }} middle center>
          <Block
            onPress={close}
            p={5}
            top={insets.top + 10}
            left={5}
            borderAll
            borderRadius={27}
            borderWidth={2}
            borderColor={colors.ACCENT}
            style={{
              position: 'absolute',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <IconMT name={Icons.close} color={colors.WHITE} size={30} />
          </Block>
          <Block mh={20} center width={'100%'} height={'100%'}>
            {/* <Image
              resizeMode="contain"
              style={{flex: 1}}
              source={{
                uri: `${imagUrl}`,
              }}
            /> */}
            <Zoomable source={imagUrl ? imagUrl : ''} />
          </Block>
        </Block>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(ModalPicture, isEqual);


const styles = StyleSheet.create({
  bacgroundContainer: {
    height: 500,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

type ImageRender = {
  images?: { url: string }[];
};



export const ImageRender = memo(({ images }: ImageRender) => {
  const [ShowImage, setShowImage] = useState<any>({});
  const [showPicture, setShowPicture] = useState<boolean>(false);

  return (
    <Block row ph={15} maxWidth={'100%'} style={{ flexWrap: 'wrap' }}>
      {images && images?.length > 0
        ? images?.map((render: any, index: any) => (
          <Block
            key={`${render}${index}`}
            mv={5}
            mr={5}
            width={'20%'}
            onPress={() => {
              setShowImage(
                `${render?.url}`,
              );
              setShowPicture(true);
            }}>
            <Image
              key={`${render}- ${index}`}
              resizeMode="cover"
              width={70}
              height={70}
              style={{ borderRadius: 5 }}
              source={{
                uri: `${render?.url}`,
              }}
            />
          </Block>
        ))
        : null}

      <ModalPicture
        isShow={showPicture}
        imagUrl={ShowImage}
        close={() => setShowPicture(false)}
      />
    </Block>
  );
}, isEqual);