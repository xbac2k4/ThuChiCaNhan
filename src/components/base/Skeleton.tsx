import isEqual from 'react-fast-compare';
import Block from './Block';
import { ReactNode, memo } from 'react';
import { SkeletonView } from 'react-native-ui-lib';
import { colors } from '../../constants/theme';

type SkeletonType = {
  isLoading: boolean;
  showContent?: boolean;
  children: ReactNode;
};

const Skeleton = ({ isLoading, showContent, children }: SkeletonType) => {
  return (
    <>
      {isLoading ? (
        <Block
          ph={20}
          pv={10}
          m={5}
          borderAll
          borderRadius={10}
          style={{ backgroundColor: colors.WHITE }}>
          <SkeletonView
            showContent={showContent || false}
            template={SkeletonView.templates.TEXT_CONTENT}
            times={10}
            colors={[colors.GRAY, colors.GRAY2, colors.GRAY3]}
          />
        </Block>
      ) : (
        children
      )}
    </>
  );
};

export default memo(Skeleton, isEqual);
