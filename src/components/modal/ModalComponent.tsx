import Block from 'components/base/Block';
import {ReactNode, memo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {AlertModal} from './MyModal';
import {Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type ComponentType = {
  showComponent: ReactNode;
  alertDanger?: boolean;
  title?: string;
  description?: string;
  onPress: () => void;
};
type InfoModalTyppe = {
  button: ReactNode;
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
};

const ModalComponent = ({
  showComponent,
  alertDanger,
  title,
  description,
  onPress,
}: ComponentType) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <Block flex={1}>
      <Block flex={1} onPress={() => setShowModal(true)}>
        {showComponent}
      </Block>

      <AlertModal
        isAlert={alertDanger}
        isShow={showModal}
        close={() => setShowModal(false)}
        title={title ?? ''}
        des={description ?? ''}
        onPress={() => {
          onPress();
          setShowModal(false);
        }}
      />
    </Block>
  );
};

export default memo(ModalComponent, isEqual);

export const InfoModal = memo(({button, children}: InfoModalTyppe) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Block
      onPress={() => {
        // setShowModal(true);
        handleOpen();
      }}>
      <Block>{button}</Block>

      <Modal visible={showModal} transparent>
        <SafeAreaView style={{flex: 1}}>
          <Block
            center
            middle
            style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            onPress={() => {
              // setShowModal(false);
              handleClose();
            }}
            flex={1}>
            <Block middle row m={20} flex={1}>
              {typeof children === 'function'
                  ? children(handleClose)
                  : children}
            </Block>
          </Block>
        </SafeAreaView>
      </Modal>
    </Block>
  );
}, isEqual);
