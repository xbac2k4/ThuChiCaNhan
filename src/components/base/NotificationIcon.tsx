import React from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-ui-lib';
import { connect, useSelector } from 'react-redux';
import { colors } from 'constants/theme';
import IconMT from 'components/icon/IconMT';
import { RootState } from 'store/store';

interface NotificationType {
  isforcus?: boolean;
  color: string;
  size: number;
}

const NotificationIcon = ({ isforcus, color, size }: NotificationType) => {
  const { notification } = useSelector((state: RootState) => state.AuthReducer);
  const unRead =
    notification?.length > 0
      ? notification.filter(notification => notification.status == '1-Chưa đọc')
        ?.length
      : 0;

  return (
    <View>
      <IconMT
        name="bell"
        color={isforcus ? colors.PRIMARY : color}
        size={size}
      />
      {unRead > 0 ? (
        <Badge
          size={12}
          labelStyle={{ color: '#fff' }}
          label={''}
          labelFormatterLimit={2}
          containerStyle={styles.icon}
          backgroundColor={colors.ERROR}
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
  },
});
