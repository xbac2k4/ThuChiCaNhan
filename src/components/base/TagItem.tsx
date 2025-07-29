import { memo } from 'react';
import Block from './Block';
import Text from './Text';
import isEqual from 'react-fast-compare';

type TagType = {
  content: string;
};

const TagItem = ({ content }: TagType) => {
  return (
    <Block ph={2} mr={2} borderRadius={2} borderAll center>
      <Text>{content}</Text>
    </Block>
  );
};

export default memo(TagItem, isEqual);
