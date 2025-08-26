import { ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';
import { Modal } from 'react-native';
import Block from './Block';
import { SafeAreaView } from 'react-native-safe-area-context';

type ModalCpnType = {
  visible: boolean;
  children: ReactNode;
  close: () => void;
};

const ModalCpn = ({ visible, children, close }: ModalCpnType) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Block
          onPress={close}
          center
          flex={1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          {children}
        </Block>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(ModalCpn, isEqual);
