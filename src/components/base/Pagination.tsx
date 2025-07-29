import { memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import Block from './Block';
import { colors } from '../../constants/theme';
import { Paginate } from '../../common/type';
import IconMT from '../../components/icon/IconMT';
import Icons from '../../common/icons';
import Text from './Text';

type PaginateType = {
  pagination: Paginate;
  onPaginate: (page: number) => void;
};

const Pagination = ({ pagination, onPaginate }: PaginateType) => {
  const [paginateBtn, setPaginateBtn] = useState<{
    prev: { color: string; active: boolean };
    next: { color: string; active: boolean };
  }>({
    prev: { color: colors.GRAY2, active: false },
    next: { color: colors.GRAY2, active: false },
  });
  useEffect(() => {
    let prev = { color: colors.GRAY2, active: false };
    let next = { color: colors.GRAY2, active: false };

    if (pagination?.page > 1) {
      prev = { color: colors.BLACK, active: true };
    }
    if (pagination?.totalPage && pagination?.page < pagination?.totalPage) {
      next = { color: colors.BLACK, active: true };
    }
    setPaginateBtn({ prev: prev, next: next });
  }, [pagination]);
  return (
    <Block
      row
      mh={5}
      borderAll
      borderRadius={5}
      style={{ backgroundColor: colors.WHITE_BLUR }}>
      <Block
        flex={1}
        center
        middle
        borderRadius={5}
        onPress={() => {
          if (paginateBtn.prev.active) {
            onPaginate(pagination?.page - 1);
          }
        }}
        style={{
          backgroundColor: paginateBtn.prev.active
            ? colors.GRAY2
            : colors?.WHITE_BLUR,
        }}>
        <IconMT
          name={Icons.chevron_left}
          color={paginateBtn?.prev.color}
          size={20}
        />
      </Block>
      <Block pv={10} flex={1} center middle>
        <Text>
          Trang {pagination?.page}
          <Text style={{ fontWeight: 'bold' }}> / </Text>
          {pagination?.totalPage}
        </Text>
      </Block>
      <Block
        flex={1}
        center
        middle
        borderRadius={5}
        style={{
          backgroundColor: paginateBtn.next.active
            ? colors.GRAY2
            : colors?.WHITE_BLUR,
        }}
        onPress={() => {
          if (paginateBtn.next.active) {
            onPaginate(pagination?.page + 1);
          }
        }}>
        <IconMT
          name={Icons.chevron_right}
          color={paginateBtn.next.color}
          size={20}
        />
      </Block>
    </Block>
  );
};

export default memo(Pagination, isEqual);
