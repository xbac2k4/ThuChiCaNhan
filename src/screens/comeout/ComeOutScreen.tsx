import { StyleSheet, Text, View, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NavigationScreenProps } from '../../common/type';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from '../../components/base/Block';
import Icons from 'common/icons';
import { bgColors, colors, fontSizes } from 'constants/theme';
import InputLabel from 'components/base/InputLabel';
import { AlertModal } from 'components/modal/MyModal';
import { readCollection } from 'services/FirebaseServices';
import { formatCurrencyVND } from 'utils/FomatNumber';
import IconMT from 'components/icon/IconMT';
import Spacer from 'components/base/Spacer';
import Button from 'components/base/Button';
import HeaderBase from 'components/base/HeaderBase';
import { AddWalletService, DeleteWalletService } from 'services/WalletServices';
import logger from 'helper/logger';
import { RefreshControl } from 'react-native-gesture-handler';
import ModalBottom from '@components/modal/ModalBottom'

const ComeOutScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    const [data, setData] = useState<any>([]);
    const [value, setValue] = useState<any>({
        name: '',
        balance: '',
        note: '',
    });
    const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
    const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<any | null>(null);

    const getInitData = async () => {
        const data = await readCollection('wallets');
        setData(data);
    }

    useEffect(() => {
        getInitData();
    }, []);

    const renderItem = ({ item }: any) => {
        return (
            <Block bg={bgColors.BG_WHITE} borderAll borderColor={colors.BORDER_COLOR} p={10} borderRadius={5} mb={5}>
                <Block flex={1} justifyBetween ph={5} row>
                    <Block>

                    </Block>
                    <Block onPress={() => {
                        setIsVisibleOptions(true);
                        setSelectedId(item?.id)
                    }}>
                        <IconMT name={Icons.dots_vertical} size={24} color={colors.BLACK1} />
                    </Block>
                </Block>
                <Spacer height={5} />
                <Block flex={1} justifyBetween ph={5} row>
                    <Text style={{ fontWeight: 'bold', fontSize: fontSizes.FONT_16 }}>{item?.name}</Text>
                    <Text style={{ color: colors.BG_GREEN3, fontSize: fontSizes.FONT_16 }}>{formatCurrencyVND(item?.balance || 0)}</Text>
                </Block>
            </Block>
        )
    };

    const addWallet = () => {
        try {
            setIsShowAdd(false);
            const params = {
                ...value,
                balance: Number(value?.balance) || 0,
            }
            AddWalletService(params);
        } catch (error) {
            logger.error(error);
        } finally {
            getInitData();
            setValue({
                name: '',
                balance: '',
                note: ''
            });
        }
    }

    const onResfresh = async () => {
        setRefresh(true);
        try {
            await getInitData();
        } catch (error) {
        } finally {
            setRefresh(false);
        }
    };

    const modalOptions = [
        {
            title: "Xóa",
            onPress: async () => {
                await DeleteWalletService(selectedId?.id)
                getInitData();
            },
        },
        {
            title: "Chỉnh sửa",
            onPress: () => {
                console.log('selectedId', selectedId);
            },
        }
    ];

    return (
        <Block flex={1}>
            <HeaderBase title='Tiền chi' />
            <Block flex={1}>
                <Block flex={1}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={onResfresh} />
                        }
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item?.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 10 }} />
                </Block>
                <Block p={10}>
                    <Button
                        linearColors={[bgColors.BG_BLUE, bgColors.BG_BLUE1]}
                        name='TẠO'
                        onPress={() => setIsShowAdd(true)} />
                </Block>
            </Block>
            <AlertModal
                isShow={isShowAdd}
                title='Tạo tài khoản mới'
                close={() => {
                    setIsShowAdd(false);
                    setValue({
                        name: '',
                        balance: '',
                        note: ''
                    });
                }}
                onPress={() => {
                    addWallet();
                }}
                children={(
                    <Block >
                        <InputLabel
                            title="Tên"
                            onChangeValue={(val) => {
                                setValue({
                                    ...value,
                                    name: val,
                                });
                            }}
                            textValue={value?.name}
                        />
                        <InputLabel
                            title='Lượng ban đầu'
                            onChangeValue={(val) => {
                                setValue({
                                    ...value,
                                    balance: val,
                                });
                            }}
                            textValue={value?.balance}
                        />
                        <InputLabel
                            title='Ghi chú'
                            onChangeValue={(val) => {
                                setValue({
                                    ...value,
                                    note: val,
                                });
                            }}
                            textValue={value?.note}
                        />
                    </Block>
                )}
            />
            <ModalBottom title="Lựa chọn" visible={isVisibleOptions} onClose={() => setIsVisibleOptions(false)} options={modalOptions} />
        </Block>
    )
}
export default memo(ComeOutScreen, isEqual);

const styles = StyleSheet.create({})