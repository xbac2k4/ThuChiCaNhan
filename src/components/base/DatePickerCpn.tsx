import { memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import Block from './Block';
import { Calendar } from 'react-native-calendars';
import ModalCpn from './ModalCpn';
import { LocaleConfig } from 'react-native-calendars';
import Text from './Text';
import { colors, fontSizes } from '../../constants/theme';
import moment from 'moment';
import { DATE_FORMAT } from '../../utils/TimeUtil';

LocaleConfig.locales.fr = {
  monthNames: [
    'Tháng 1 năm',
    'Tháng 2 năm',
    'Tháng 3 năm',
    'Tháng 4 năm',
    'Tháng 5 năm',
    'Tháng 6 năm',
    'Tháng 7 năm',
    'Tháng 8 năm',
    'Tháng 9 năm',
    'Tháng 10 năm',
    'Tháng 11 năm',
    'Tháng 12 năm',
  ],
  monthNamesShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
};
LocaleConfig.defaultLocale = 'fr';

type DatePickerCpnType = {
  visible: boolean;
  close: () => void;
  submit: (day: string) => void;
  selectValue: string;
};

const DatePickerCpn = ({
  visible,
  close,
  submit,
  selectValue,
}: DatePickerCpnType) => {
  const [date, setDate] = useState<string>(selectValue);
  const [timeData, setTimeData] = useState<any>({
    year: '',
    month: '',
    day: '',
  });

  useEffect(() => {
    const month = moment(date, DATE_FORMAT.MONTH_DAY_MINUS).format('MM');
    const year = moment(date, DATE_FORMAT.MONTH_DAY_MINUS).format('YYYY');
    const day = moment(date, DATE_FORMAT.MONTH_DAY_MINUS).format('DD');
    setTimeData({
      year: year,
      month: month,
      day: day,
    });
  }, [date]);

  return (
    <ModalCpn visible={visible} close={close}>
      <Block onPress={() => { }} m={20} style={{ backgroundColor: colors.WHITE }}>
        <Block style={{ backgroundColor: colors.SECONDARY }} p={20}>
          <Block>
            <Text style={styles.year}>{timeData.year}</Text>
          </Block>
          <Block pt={10}>
            <Text style={styles.month}>
              Ngày {timeData.day} tháng {timeData.month}
            </Text>
          </Block>
        </Block>
        <Calendar
          onDayPress={(day: any) => {
            setDate(day?.dateString);
          }}
          markedDates={{
            [date]: { selected: true, selectedColor: colors.SECONDARY },
          }}
        />
        <Block row justifyEnd p={20}>
          <Block ph={10} onPress={close}>
            <Text style={styles.btn}>Hủy</Text>
          </Block>
          <Block
            ph={10}
            onPress={() => {
              submit(date);
              close();
            }}>
            <Text style={styles.btn}>Xác nhận</Text>
          </Block>
        </Block>
      </Block>
    </ModalCpn>
  );
};

export default memo(DatePickerCpn, isEqual);

const styles = StyleSheet.create({
  btn: {
    fontSize: fontSizes.FONT_18,
    fontWeight: 'bold',
    color: colors.SECONDARY,
  },
  year: {
    fontSize: fontSizes.FONT_16,
    fontWeight: '700',
    color: colors.WHITE_BLUR,
  },
  month: {
    fontSize: fontSizes.FONT_22,
    fontWeight: '500',
    color: colors.WHITE,
  },
});
