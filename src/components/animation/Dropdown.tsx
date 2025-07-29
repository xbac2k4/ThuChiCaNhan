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
  title: string;
  component?: ReactNode;
  toggleItem?: ReactNode;
  top?: boolean;
  right?: boolean;
  showArrow?: boolean;
  isDropDown?: boolean;
};

const Dropdown = ({
  containerStyle,
  title,
  component,
  toggleItem,
  top,
  right,
  showArrow,
  isDropDown,
}: DropdownType) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const animationController = useRef(new Animated.Value(0)).current;

  const onToggle = () => {
    const isToggle = isDropDown ?? true;
    if (isToggle) {
      const config = {
        duration: 300,
        toValue: toggle ? 0 : 1,
        useNativeDriver: true,
      };
      Animated.timing(animationController, config).start();
      LayoutAnimation.configureNext(toggleAnimation);
      setToggle(!toggle);
    }
  };

  const arrowTransporm = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  const arrowRender = () => {
    return (
      <>
        {showArrow ? (
          <Block center middle row>
            <Text style={styles.text}>{title}</Text>
            <Block ph={5}>
              <Animated.View style={{transform: [{rotateZ: arrowTransporm}]}}>
                <IconMT
                  name={Icons.chevron_down}
                  size={25}
                  color={colors.SECONDARY}
                />
              </Animated.View>
            </Block>
          </Block>
        ) : null}
      </>
    );
  };

  const renderToggle = () => {
    if (top == true) {
      return (
        <Block style={styles.hidden} onPress={() => onToggle()}>
          <Block>{component ? component : null}</Block>
          {toggle ? toggleItem ?? <Block /> : null}
          {arrowRender()}
        </Block>
      );
    } else {
      if (right) {
        return (
          <Block style={styles.hidden} onPress={() => onToggle()}>
            <Block flex={1} row>
              <Block flex={1}>{component ? component : null}</Block>
              <Block style={{ position: 'absolute', right: 5, top: 10 }}>{arrowRender()}</Block>
            </Block>
            {toggle ? toggleItem ?? <Block /> : null}
          </Block>
        );
      }
      return (
        <Block style={styles.hidden} onPress={() => onToggle()}>
          {toggle ? toggleItem ?? <Block /> : null}
          {arrowRender()}
          <Block>{component ? component : null}</Block>
        </Block>
      );
    }
  };

  return (
    <Block style={{...styles.container, ...containerStyle}}>
      {renderToggle()}
    </Block>
  );
};

export default memo(Dropdown, isEqual);

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
