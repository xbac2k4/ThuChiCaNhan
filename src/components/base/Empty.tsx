import { memo } from "react";
import Block from "./Block";
import isEqual from "react-fast-compare";

const EmptyScreen = () => {
  return <Block></Block>;
};

export default memo(EmptyScreen, isEqual);
