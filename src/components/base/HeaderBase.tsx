import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import isEqual from 'react-fast-compare';
import IconMT from 'components/icon/IconMT';
import Block from './Block';
import Icons from 'common/icons';
import { goBack, navigate } from 'utils/NavigationUtils';
import { colors, fontSizes } from 'constants/theme';

type HeaderBaseProps = {
    title?: string;
};

const HEADER_HEIGHT = 300;

const HeaderBase: React.FC<HeaderBaseProps> = ({ title = '' }) => {
    return (
        <Block>
            <Block style={styles.headerBg} />
            <Block ph={20} pt={50} row center middle mb={20}>
                <Block middle center onPress={goBack}>
                    <IconMT name={Icons.arrow_left} size={24} color={colors.WHITE} />
                </Block>
                <Block flex={1} middle center>
                    <Text style={styles.title}>{title}</Text>
                </Block>
            </Block>
        </Block>
    );
};

export default memo(HeaderBase, isEqual);

const styles = StyleSheet.create({
    headerBg: {
        position: 'absolute',
        top: 0,
        left: -0,
        right: -0,
        height: HEADER_HEIGHT,
        backgroundColor: '#42A6ED',
        borderBottomRightRadius: '100%',
        borderBottomLeftRadius: '100%',
        zIndex: -1,
    },
    title: {
        fontSize: fontSizes.FONT_18,
        fontWeight: 'bold',
        color: colors.WHITE,
    },
});
