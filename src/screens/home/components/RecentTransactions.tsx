import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

// Interface mới cho dữ liệu giao dịch
interface RecentTransaction {
    id: string;
    title: string;
    des: string;
    value: string;
    date: string;
    recenttransactions: number;
}

interface RecentTransactionsProps {
    selectedTab: 'chi' | 'thu';
}

const transactions: RecentTransaction[] = [
    {id: '1',title: 'Tiền siêu thị',des: 'Chi tiêu hằng ngày',value: '250.000',date: '03/06/23',recenttransactions: 1, },
    {id: '2',title: 'Lương tháng 6',des: 'Nguồn thu nhập',value: '10.000.000',date: '03/06/23',recenttransactions: 2},
    {id: '3',title: 'Tiền xăng',des: 'Di chuyển',value: '50.000',date: '02/06/23',recenttransactions: 1,},
    {id: '4',title: 'Tiền siêu thị',des: 'Chi tiêu hằng ngày',value: '250.000',date: '03/06/23',recenttransactions: 1, },
    {id: '5',title: 'Lương tháng 6',des: 'Nguồn thu nhập',value: '10.000.000',date: '03/06/23',recenttransactions: 2},
    {id: '6',title: 'Tiền xăng',des: 'Di chuyển',value: '50.000',date: '02/06/23',recenttransactions: 1,},
    {id: '7',title: 'Tiền siêu thị',des: 'Chi tiêu hằng ngày',value: '250.000',date: '03/06/23',recenttransactions: 1, },
    {id: '8',title: 'Lương tháng 6',des: 'Nguồn thu nhập',value: '10.000.000',date: '03/06/23',recenttransactions: 2},
    {id: '9',title: 'Tiền xăng',des: 'Di chuyển',value: '50.000',date: '02/06/23',recenttransactions: 1,},
    {id: '10',title: 'Tiền siêu thị',des: 'Chi tiêu hằng ngày',value: '250.000',date: '03/06/23',recenttransactions: 1, },
    {id: '11',title: 'Lương tháng 6',des: 'Nguồn thu nhập',value: '10.000.000',date: '03/06/23',recenttransactions: 2},
    {id: '12',title: 'Tiền xăng',des: 'Di chuyển',value: '50.000',date: '02/06/23',recenttransactions: 1,},
];

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ selectedTab }) => {
    // Sắp xếp dữ liệu theo ngày tháng giảm dần
    const sortedTransactions = [...transactions].sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
    });
    
    // Lọc dữ liệu dựa trên tab đang được chọn
    const filteredTransactions = transactions.filter(item => {
        if (selectedTab === 'chi' && item.recenttransactions === 1) {
            return true;
        }
        if (selectedTab === 'thu' && item.recenttransactions === 2) {
            return true;
        }
        return false;
    });// .slice(0, 4); // Giới hạn chỉ hiển thị 4 mục

    const renderTransactionItem = ({ item }: { item: RecentTransaction }) => {
        return (
            
            <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                    <View style={styles.colorDot} />
                    <View>
                        <Text style={styles.transactionTitle}>{item.title}</Text>
                        <Text style={styles.transactionDes}>{item.des}</Text>
                    </View>
                </View>
                <View style={styles.transactionRight}>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                    <Text style={styles.transactionValue}>{item.value}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredTransactions}
                renderItem={renderTransactionItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default memo(RecentTransactions, isEqual);

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 16,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6A5ACD', // Màu sắc tùy chỉnh
        marginRight: 10,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    transactionDes: {
        fontSize: 14,
        color: '#888888',
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionDate: {
        fontSize: 14,
        color: '#888888',
    },
    transactionValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
});

