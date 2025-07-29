import Icons from 'common/icons';
import Block from 'components/base/Block';
import Text from 'components/base/Text';
import IconMT from 'components/icon/IconMT';
import {colors} from 'constants/theme';
import {ReactNode, memo, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Animated, LayoutAnimation, StyleSheet, ViewStyle} from 'react-native';
import {toggleAnimation} from './toggleAnimation';

type DropdownType = {
  containerStyle?: ViewStyle;
  component: ReactNode;
  toggleItem: ReactNode;
};

const DropdownBase = ({
  containerStyle,
  component,
  toggleItem,
}: DropdownType) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const animationController = useRef(new Animated.Value(0)).current;

  const onToggle = () => {
    const config = {
      duration: 300,
      toValue: toggle ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setToggle(!toggle);
  };

  const renderToggle = () => {
    return (
      <Block style={styles.hidden}>
        <Block onPress={() => onToggle()}>
          {component ? component : null}
          {toggle ? null : (
            <Block p={5} center middle>
              <IconMT
                name={Icons.chevron_down}
                color={colors.SECONDARY}
                size={20}
              />
            </Block>
          )}
        </Block>
        {toggle ? toggleItem ?? <Block /> : null}
      </Block>
    );
  };

  return (
    <Block style={{...styles.container, ...containerStyle}}>
      {renderToggle()}
    </Block>
  );
};

export default memo(DropdownBase, isEqual);

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: colors.SECONDARY,
    overflow: 'hidden',
  },
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    overflow: 'hidden',
  },
  hidden: {
    overflow: 'hidden',
  },
});
