import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, memo, useState } from 'react'
import isEqual from 'react-fast-compare';
import Block from 'components/base/Block';
import { colors, fontSizes } from 'constants/theme';
import IconMT from 'components/icon/IconMT';
import { storeT } from 'utils/Http';

const CustomHeader = () => {
    const [user, setUser] = useState<any>('');
    const getUser = async () => {
        const user = await storeT.getUser();
        setUser(user);
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <Block
            height={50}
            justifyBetween
            p={10}
            middle
            row
            bg={colors.TRANSPARENT}>
            <Block>
                <Text style={{ color: colors.GRAY, fontSize: fontSizes.FONT_16 }}>Xin chào, {user}</Text>
            </Block>
            <Block row style={{ gap: 10 }}>
                <Block>
                    <IconMT name={'magnify'} color={colors.BLACK} size={24} />
                </Block>
                <Block>
                    <IconMT name={'bell'} color={colors.BLACK} size={24} />
                </Block>
            </Block>
        </Block>
    );
}

export default memo(CustomHeader, isEqual);

const styles = StyleSheet.create({})