import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, FlatList, TextInput, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react'
import { NavigationScreenProps } from '../../common/type';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from '../../components/base/Block';
import CategoryList from './components/Categorize_expenses';
import RecentTransactions from './components/RecentTransactions';
import { ScrollView } from 'react-native-gesture-handler';
import { backgrounds } from 'constants/images';
import CustomHeader from './components/CustomHeader';
import { colors } from 'constants/theme';

const HomeScreen: React.FC<NavigationScreenProps> = ({
    navigation
}) => {
    const [selectedTab, setSelectedTab] = useState<'chi' | 'thu'>('chi');
    const [text, setText] = useState<string>('');

    return (
        <Block flex={1}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <CustomHeader />
                <View>
                    <TextInput
                        placeholder='Nhập'
                        placeholderTextColor={colors.GRAY}
                        style={{
                            borderColor: '#000000',
                            borderWidth: 1,
                            margin: 10,
                            color: '#000000',
                            padding: 5,
                            borderRadius: 10
                        }} value={text} onChangeText={(val: any) => setText(val)} />
                </View>
                <ImageBackground style={styles.bannerContainer} source={backgrounds.bg_banner}>
                    <View style={styles.bannerBackground}>
                        <Text style={styles.bannerTitle}>Số tiền bạn chi trong tháng</Text>
                        <TouchableOpacity>
                            <Text style={styles.bannerLink}>Xem chi tiết → </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountText}
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}>
                            100.000.000
                        </Text>
                        <Text style={styles.balanceText}
                            numberOfLines={1}
                            adjustsFontSizeToFit={true} >
                            Số dư: 100.000.000
                        </Text>
                    </View>
                </ImageBackground>

                <CategoryList />

                <View style={styles.recentTransactionsSection}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Giao dịch gần đây</Text>
                        <TouchableOpacity onPress={() => console.log('Xem thêm được bấm')}>
                            <Text style={styles.seeMoreText}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.tabButton, selectedTab === 'chi' ? styles.tabButtonSelected : null]}
                            onPress={() => setSelectedTab('chi')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'chi' ? styles.tabTextSelected : null]}>Chi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, selectedTab === 'thu' ? styles.tabButtonSelected : null]}
                            onPress={() => setSelectedTab('thu')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'thu' ? styles.tabTextSelected : null]}>Thu</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Phần danh sách giao dịch */}
                <RecentTransactions selectedTab={selectedTab} />
            </ScrollView>
        </Block>
    )
}

export default memo(HomeScreen, isEqual);

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,

    },
    bannerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        margin: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerBackground: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    bannerLink: {
        fontSize: 14,
        color: '#007BFF',
        marginTop: 8,
    },
    amountContainer: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
    },
    amountText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF7D39',
    },
    balanceText: {
        fontSize: 14,
        color: '#888888',
        marginTop: 4,
    },
    recentTransactionsSection: {
        marginHorizontal: 16,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    seeMoreText: {
        fontSize: 14,
        color: '#007BFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    tabButtonSelected: {
        backgroundColor: '#007BFF',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888888',
    },
    tabTextSelected: {
        color: '#FFFFFF',
    },
});