import Block from 'components/base/Block';
import Spacer from 'components/base/Spacer';
import Text from 'components/base/Text';
import { colors, fontSizes } from 'constants/theme';
import { memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native';
import { Picker as Weelicker } from 'react-native-wheel-pick';

type ModalType = {
  isShow: boolean;
  date: {
    day?: number;
    month: number;
    year: number;
  };
  close: () => void;
  onSetDate: (data: { month: number; year: number }) => void;
  onAccept: () => void;
};

const MonthYearPicker = ({
  isShow,
  close,
  onSetDate,
  onAccept,
  date,
}: ModalType) => {
  const currentdate = new Date();
  const currentMonth: number = currentdate.getMonth();
  const currentYear: number = currentdate.getFullYear();
  const [month, setMonth] = useState<number>(NaN);
  const [monthArr, setMonthArr] = useState<number[]>([]);
  const [year, setYear] = useState<number>(NaN);
  const [yearArr, setYearArr] = useState<number[]>([]);

  useEffect(() => {
    const dataY: number[] = [];
    const dataM: number[] = [];
    for (let i = 2023; i < currentYear + 2; i++) {
      dataY.push(i);
    }
    for (let i = 1; i < 13; i++) {
      dataM.push(i);
    }
    setMonth(+date?.month);
    setYear(date.year);
    setMonthArr(dataM);
    setYearArr(dataY);
  }, []);

  return (
    <Modal
      visible={isShow}
      transparent
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Block
          center
          middle
          flex={1}
          onPress={close}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <Block flex={1} />
          <Block
            flex={1}
            row
            p={20}
            mh={20}
            style={{ backgroundColor: colors.WHITE }}
            borderRadius={20}
            onPress={() => { }}>
            <Block />
            <Block flex={1} middle>
              <Block>
                <Text style={{ fontSize: fontSizes.FONT_18, fontWeight: '600' }}>
                  Chọn tháng
                </Text>
              </Block>
              <Block flex={1} row center middle>
                <Block flex={1}>
                  <Weelicker
                    style={{ backgroundColor: 'white' }}
                    selectedValue={`${month}`}
                    pickerData={monthArr}
                    onValueChange={(value: number) => {
                      setMonth(value);
                    }}
                  />
                </Block>
                <Block flex={1}>
                  <Weelicker
                    style={{ backgroundColor: 'white' }}
                    selectedValue={`${year}`}
                    pickerData={yearArr}
                    onValueChange={(value: number) => {
                      setYear(value);
                    }}
                  />
                </Block>
              </Block>
            </Block>
          </Block>

          <Block
            row
            onPress={() => {
              onSetDate({ month: month, year: year });
              onAccept();
              close();
            }}>
            <Block />
            <Block
              flex={1}
              mh={20}
              mt={10}
              p={10}
              middle
              borderRadius={5}
              style={{ backgroundColor: colors.WHITE }}>
              <Text style={{ fontWeight: '700', fontSize: fontSizes.FONT_18 }}>
                Chọn
              </Text>
            </Block>
          </Block>

          <Block row onPress={close}>
            <Block />
            <Block
              flex={1}
              mh={20}
              mt={10}
              p={10}
              middle
              borderRadius={5}
              style={{ backgroundColor: colors.WHITE }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: fontSizes.FONT_18,
                  color: colors.ERROR,
                }}>
                Đóng
              </Text>
            </Block>
          </Block>

          <Spacer height={20} />
        </Block>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(MonthYearPicker, isEqual);
