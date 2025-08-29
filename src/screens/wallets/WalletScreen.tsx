import { StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationScreenProps } from '../../common/type';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from '../../components/base/Block';
import Icons from 'common/icons';
import { bgColors, colors, fontSizes } from 'constants/theme';
import InputLabel from 'components/base/InputLabel';
import { AlertModal } from 'components/modal/MyModal';
import IconMT from 'components/icon/IconMT';
import Spacer from 'components/base/Spacer';
import Button from 'components/base/Button';
import HeaderBase from 'components/base/HeaderBase';
import { AddWalletService, DeleteWalletService, UpdateWalletService } from 'services/walletServices';
import { RefreshControl } from 'react-native-gesture-handler';
import ModalBottom from '@components/modal/ModalBottom'
import { RootState, useAppDispatch } from 'store/store';
import { useSelector } from 'react-redux';
import { getListWalletThunk } from 'store/thunk/WalletThunk';
import { formatCurrencyVND, formatTextVND } from 'utils/FomatNumber';
import Text from 'components/base/Text';
import Switch from 'components/base/Switch';
import logger from 'helper/logger';

const WalletScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    const dispatch = useAppDispatch();
    const { list_wallet } = useSelector(
        (state: RootState) => state.WalletReducer,
    );
    const [value, setValue] = useState<any>({
        name: '',
        balance: '',
        note: '',
        active: true,
    });
    const [isError, setIsError] = useState<any>({
        name: false,
        balance: false,
    });
    const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
    const [isShowUpdate, setIsShowUpdate] = useState<boolean>(false);
    const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selected, setSelected] = useState<any | null>(null);
    const [hiddenBalances, setHiddenBalances] = useState<string[]>([]);

    const getInitData = async () => {
        await dispatch(getListWalletThunk());
    }

    useEffect(() => {
        if (list_wallet) {
            getInitData();
        }
    }, []);

    const toggleBalanceVisibility = (id: string) => {
        setHiddenBalances(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const renderItem = ({ item }: any) => {
        const isHidden = hiddenBalances.includes(item?.id);
        return (
            <Block bg={bgColors.BG_WHITE} borderAll borderColor={colors.BORDER_COLOR} p={10} borderRadius={5} mb={5}>
                <Block flex={1} justifyBetween ph={5} row>
                    <Block>
                        <Switch isActive={item?.active} onValueChange={async () => {
                            await UpdateWalletService(item?.id, {
                                active: !item?.active
                            })
                            getInitData();
                        }} />
                    </Block>
                    <Block row gap={5}>
                        <Block onPress={() => {
                            toggleBalanceVisibility(item?.id);
                        }}>
                            <IconMT name={isHidden ? Icons.eye : Icons.eye_off} size={24} color={colors.BLACK1} />
                        </Block>
                        <Block onPress={() => {
                            setIsVisibleOptions(true);
                            setSelected(item)
                        }}>
                            <IconMT name={Icons.dots_vertical} size={24} color={colors.BLACK1} />
                        </Block>
                    </Block>
                </Block>
                <Spacer height={5} />
                <Block flex={1} justifyBetween ph={5} row>
                    <Text style={{ fontWeight: 'bold', fontSize: fontSizes.FONT_16 }}>{item?.name}</Text>
                    <Text style={{ color: colors.BG_GREEN3, fontSize: fontSizes.FONT_16 }}>{isHidden ? formatCurrencyVND(item?.balance || 0) : '******'}</Text>
                </Block>
                <Block flex={1} justifyBetween ph={5} row>
                    <Text style={{ fontSize: fontSizes.FONT_16, color: colors.GRAY }}>{item?.note}</Text>
                </Block>
            </Block>
        )
    };

    const onPress = async () => {
        try {
            let hasError = false;
            let newErrors = { ...isError };

            if (!value?.name?.trim()) {
                newErrors.name = true;
                hasError = true;
            } else {
                newErrors.name = false;
            }

            if (!value?.balance?.trim()) {
                newErrors.balance = true;
                hasError = true;
            } else {
                newErrors.balance = false;
            }
            setIsError(newErrors);
            if (hasError) return;

            setIsShowAdd(false);
            setIsShowUpdate(false);

            const params = {
                ...value,
                balance: Number(value?.balance) || 0,
            }
            isShowAdd && AddWalletService(params);
            isShowUpdate && UpdateWalletService(selected?.id, params);
            setIsError({
                ...isError,
                name: false,
                balance: false,
            });
        } catch (error) {
            logger.error(error);
        } finally {
            await getInitData();
            setValue({
                ...value,
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
                await DeleteWalletService(selected?.id)
                getInitData();
            },
        },
        {
            title: "Chỉnh sửa",
            onPress: () => {
                setIsShowUpdate(true);
                setValue({
                    ...value,
                    name: selected?.name,
                    balance: selected?.balance,
                    note: selected?.note,
                    active: selected?.active,
                });
            },
        }
    ];

    return (
        <Block flex={1}>
            <HeaderBase title='Tài khoản' />
            <Block flex={1}>
                <Block flex={1}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={onResfresh} />
                        }
                        data={list_wallet}
                        renderItem={renderItem}
                        keyExtractor={item => item?.id.toString()}
                        ListEmptyComponent={() => (
                            <Block flex={1} middle center>
                                <Text style={{ ...styles.text }}>Bạn chưa có ví!</Text>
                            </Block>
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 10 }} />
                </Block>
                <Block flex={0.1} p={10}>
                    <Button
                        linearColors={[bgColors.BG_BLUE, bgColors.BG_BLUE1]}
                        name='THÊM'
                        onPress={() => setIsShowAdd(true)} />
                </Block>
            </Block>
            <AlertModal
                isShow={isShowAdd || isShowUpdate}
                title={isShowUpdate ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản mới'}
                close={() => {
                    setIsShowAdd(false);
                    setIsShowUpdate(false);
                    setValue({
                        ...value,
                        name: '',
                        balance: '',
                        note: ''
                    });
                    setIsError({
                        ...isError,
                        name: false,
                        balance: false,
                    });
                }}
                onPress={() => {
                    onPress();
                }}
                children={(
                    <Block>
                        <InputLabel
                            title="Tên"
                            onChangeValue={(val) => {
                                setValue({
                                    ...value,
                                    name: val,
                                });
                                setIsError({
                                    ...isError,
                                    name: !val,
                                });
                            }}
                            error={{
                                title: 'Bạn chưa nhập tên',
                                isError: isError?.name
                            }}
                            textPlaceHolder='Tên'
                            textValue={value?.name} />
                        <InputLabel
                            title='Số dư ban đầu'
                            onChangeValue={(val) => {
                                const numericValue = val.replace(/\D/g, "");
                                setValue({
                                    ...value,
                                    balance: numericValue,
                                });
                                setIsError({
                                    ...isError,
                                    balance: !val,
                                });
                            }}
                            error={{
                                title: 'Bạn chưa nhập số dư',
                                isError: isError?.balance
                            }}
                            textPlaceHolder={formatCurrencyVND(0)}
                            keyboardType='numeric'
                            textValue={formatTextVND(value?.balance)} />
                        <InputLabel
                            title='Ghi chú'
                            onChangeValue={(val) => {
                                setValue({
                                    ...value,
                                    note: val,
                                });
                            }} textPlaceHolder='Ghi chú'
                            textValue={value?.note} />
                    </Block>
                )} />
            <ModalBottom title="Lựa chọn" visible={isVisibleOptions} onClose={() => setIsVisibleOptions(false)} options={modalOptions} />
        </Block>
    )
}
export default memo(WalletScreen, isEqual);

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.FONT_18,
        color: colors.GRAY,
    }
})