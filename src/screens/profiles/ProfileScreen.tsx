import { ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import Block from 'components/base/Block';
import IconMT from 'components/icon/IconMT';
import { Image } from 'react-native-animatable';
import { ButtonSettingHor, ButtonSettingVer } from 'components/base/ButtonLabel';
import Icons from 'common/icons';
import { colors, fontSizes } from 'constants/theme';
import { LogoutUser } from 'services/index';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Spacer from 'components/base/Spacer';
import { navigate } from 'utils/NavigationUtils';
import { COMMON_PATHS } from 'navigation/Path';

type SetingBtn = {
    title: string;
    icon: string;
    iconColor?: string,
    onPress: () => void;
    style: TextStyle;
    show: boolean;
};

const ProfileScreen = () => {
    const { profile } = useSelector(
        (state: RootState) => state.AuthReducer,
    );
    const renderSetingBtnHor: SetingBtn[] = [
        // {
        //     show: true,
        //     title: 'Xóa cache',
        //     icon: Icons.trash_can,
        //     onPress: function (): void {

        //     },
        //     style: styles.textStyle,
        // },
        {
            show: true,
            title: 'Trợ giúp và phản hồi',
            icon: Icons.round_account,
            onPress: function (): void {

            },
            style: styles.textStyle,
        },
        {
            show: true,
            title: 'Về chúng tôi',
            icon: Icons.round_account,
            onPress: function (): void {

            },
            style: styles.textStyle,
        },
        {
            show: true,
            title: 'Đăng xuất',
            icon: Icons.logout,
            iconColor: colors.ERROR,
            onPress: function (): void {
                LogoutUser();
            },
            style: { ...styles.textStyle, color: colors.ERROR },
        },
    ];
    const renderSetingBtnVer: SetingBtn[] = [
        {
            show: true,
            title: 'Ví',
            icon: Icons.wallet,
            iconColor: colors.BASE,
            onPress: function (): void {
                navigate(COMMON_PATHS.WALLET_SCREEN);
            },
            style: { ...styles.textStyle, fontSize: fontSizes.FONT_14 },
        },
        {
            show: true,
            title: 'Tải xuống',
            icon: Icons.download,
            iconColor: '#FFD93D',
            onPress: function (): void {

            },
            style: { ...styles.textStyle, fontSize: fontSizes.FONT_14 },
        },
        {
            show: true,
            title: 'Xóa',
            icon: Icons.delete_outline,
            iconColor: '#4CD964',
            onPress: function (): void {

            },
            style: { ...styles.textStyle, fontSize: fontSizes.FONT_14 },
        },
        {
            show: true,
            title: 'Chia sẻ',
            icon: Icons.share_variant,
            onPress: function (): void {

            },
            style: { ...styles.textStyle, fontSize: fontSizes.FONT_14 },
        },
    ];
    return (
        <Block
            flex={1}
            p={20}
            bg={colors.WHITE}>
            <Block row middle>
                <Image
                    source={{ uri: 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' }}
                    style={styles.avatar} />
                <Block flex={1} ml={10}>
                    <Text style={{ fontSize: fontSizes.FONT_18 }}>{profile?.displayName}</Text>
                    <Block row middle>
                        <IconMT name={Icons.diamond} size={14} color="#FFD700" />
                        <Text style={styles.vipText}>VIP</Text>
                    </Block>
                </Block>
            </Block>
            <Spacer height={20} />

            {/* <View style={styles.vipCard}>
                <Text style={styles.vipCardText}>MY VIP</Text>
                <Text style={styles.vipCardSubText}>Valid until 2020.02.01</Text>
            </View>

            <View style={styles.deviceContainer}>
                <Text style={styles.deviceTitle}>Device Name</Text>
                <Text style={styles.deviceSubTitle}>500G/1T</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Share Device</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.managementContainer}>
                <Text>Management</Text>
                <Text style={styles.managementLink}>Samba {'>'}</Text>
            </View> */}
            <Block
                bg={colors.WHITE}
                pv={5}
                row>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderSetingBtnVer?.map((ren: SetingBtn) => {
                        if (ren.show) {
                            return (
                                <Block width={90} key={ren.title}>
                                    <ButtonSettingVer
                                        key={ren.title}
                                        onPress={ren.onPress}
                                        title={ren.title}
                                        icon={ren.icon}
                                        iconColor={ren?.iconColor}
                                        textStyle={ren.style}>
                                    </ButtonSettingVer>
                                </Block>
                            );
                        }
                    })}
                </ScrollView>
            </Block>
            <Block
                bg={colors.WHITE}
                borderRadius={10}
                borderAll>
                {renderSetingBtnHor?.map((ren: SetingBtn) => {
                    if (ren.show) {
                        return (
                            <ButtonSettingHor
                                key={ren.title}
                                onPress={ren.onPress}
                                title={ren.title}
                                icon={ren.icon}
                                iconColor={ren.iconColor}
                                textStyle={ren.style}>
                            </ButtonSettingHor>
                        );
                    }
                })}
            </Block>
        </Block>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    //
    textStyle: {
        fontSize: fontSizes.FONT_16,
    },
    //
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc' },
    name: { fontSize: 18, fontWeight: 'bold' },
    vipContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    vipText: { marginLeft: 4, fontSize: 12, color: '#FFD700' },
    accountText: { color: '#999', fontSize: 14 },
    vipCard: { backgroundColor: '#4B3FBD', padding: 15, borderRadius: 10, marginBottom: 20 },
    vipCardText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    vipCardSubText: { color: '#fff', fontSize: 12, marginTop: 4 },
    deviceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    deviceTitle: { fontSize: 16, fontWeight: '500' },
    deviceSubTitle: { fontSize: 12, color: '#999' },
    shareButton: { backgroundColor: '#4D96FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    shareButtonText: { color: '#fff', fontSize: 12 },
    managementContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    managementLink: { color: '#4D96FF' },
    actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    actionItem: { alignItems: 'center' },
    optionsContainer: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
    optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    optionText: { marginLeft: 10, fontSize: 16 },
});