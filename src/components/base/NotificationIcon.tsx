import React from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { colors } from 'constants/theme';
import IconMT from 'components/icon/IconMT';
import { RootState } from 'store/store';
import Block from './Block';

interface NotificationType {
  isforcus?: boolean;
  color: string;
  size: number;
}

const NotificationIcon = ({ isforcus, color, size }: NotificationType) => {
  const unRead = 0;

  return (
    <View>
      <IconMT
        name="bell"
        color={isforcus ? colors.PRIMARY : color}
        size={size}
      />
      {unRead > 0 ? (
        <View
          style={{ ...styles.icon }}
        />
      ) : null}
    </View>
  );
};

export default React.memo(NotificationIcon, isEqual);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: -3,
    right: -5,
    width: 24, 
    height: 24,
    borderRadius: 5,
    backgroundColor: colors.ERROR
  },
});
