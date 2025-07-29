import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
}

const CSpacer: React.FC<SpacerProps> = ({ width, height }) => {
  return (
    <View
      style={{
        width: width || 0,
        height: height || 0,
      }}
    />
  );
};

const Spacer = React.memo(CSpacer);

export default Spacer;
