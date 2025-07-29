import { memo, SetStateAction, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import Block from './Block';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import ModalCpn from './ModalCpn';
import Text from './Text';
import { colors, fontSizes } from 'constants/theme';
import moment from 'moment';
import Section from './Section';
import Icons from 'common/icons';
import IconMT from 'components/icon/IconMT';

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
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};
LocaleConfig.defaultLocale = 'fr';

type DateTimeInputType = {
  title?: string;
  modes: string;
  selectValue: string;
  onChangeValue: (val: string) => void;
  minDate?: string;
  maxDate?: string;
  editable?: boolean;
};

const DateTimeInput = ({
  modes,
  onChangeValue,
  selectValue,
  title,
  minDate,
  maxDate,
  editable,
}: DateTimeInputType) => {
  const [date, setDate] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const [timeData, setTimeData] = useState<any>({
    year: '',
    month: '',
    day: '',
  });
  const isEdit = editable ?? true;
  const editColor = isEdit ? colors?.BLACK : colors?.COLOR_GRAY;
  const onChooseTime = () => {
    onChangeValue(date);
  };

  useEffect(() => {
    setDate(selectValue);
  }, [selectValue]);

  useEffect(() => {
    const month = moment(selectValue, 'YYYY-MM-DD').format('MM');
    const year = moment(selectValue, 'YYYY-MM-DD').format('YYYY');
    const day = moment(selectValue, 'YYYY-MM-DD').format('DD');

    setTimeData({
      year: year,
      month: month,
      day: day,
    });
  }, [date]);

  return (
    <Block>
      {title ? (
        <Section
          title={title}
          componentStyle={{ backgroundColor: 'transparent' }}
        />
      ) : null}
      <Block
        row
        borderAll
        borderRadius={5}
        ph={10}
        middle
        style={styles.input}
        onPress={() => isEdit && setShowModal(true)}>
        <Text style={{ color: editColor, flex: 1 }}>
          {moment(selectValue, 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Text>
        <Block pv={15}>
          <IconMT name={Icons.chevron_down} color={editColor} size={20} />
        </Block>
      </Block>
      <ModalCpn visible={showModal} close={() => setShowModal(false)}>
        <Block
          onPress={() => { }}
          m={20}
          style={{ backgroundColor: colors.WHITE }}>
          <Block style={{ backgroundColor: colors.SECONDARY }} p={20}>
            <Block>
              <Text style={styles.year}>{timeData?.year}</Text>
            </Block>
            <Block pt={10}>
              <Text style={styles.month}>
                Ngày {timeData?.day} tháng {timeData?.month}
              </Text>
            </Block>
          </Block>
          <Calendar
            maxDate={maxDate ? maxDate : ''}
            minDate={minDate ? minDate : ''}
            onDayPress={(day: { dateString: SetStateAction<string> }) => {
              setDate(day?.dateString);
            }}
            markedDates={{
              [date]: { selected: true, selectedColor: colors.SECONDARY },
            }}
          />
          <Block row justifyEnd p={20}>
            <Block ph={10} onPress={() => setShowModal(false)}>
              <Text style={styles.btn}>Đóng</Text>
            </Block>
            <Block
              ph={10}
              onPress={() => {
                setShowModal(false);
                onChooseTime();
              }}>
              <Text style={styles.btn}>Xác nhận</Text>
            </Block>
          </Block>
        </Block>
      </ModalCpn>
    </Block>
  );
};

export default memo(DateTimeInput, isEqual);

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
  input: {
    backgroundColor: colors.WHITE_BLUR,
  },
});
