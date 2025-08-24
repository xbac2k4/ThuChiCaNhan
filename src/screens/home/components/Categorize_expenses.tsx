import images, { backgrounds } from 'constants/images';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native';

// Định nghĩa kiểu dữ liệu cho danh mục
interface Category {
    id: string;
    name: string;
    value: string;
    percentage: string;
}
    const COLORS_BG_CATEGORY = [
        '#6A45DC',
        '#EA9F45',
        '#6BC0E2',
    ];

// Không cần CategoryListProps nữa vì dữ liệu được quản lý ở đây
const CategoryList: React.FC = () => {
    // Dữ liệu mẫu cho các danh mục chi tiêu, được chuyển vào đây
    const categories: Category[] = [
        { id: '1', name: 'Cần thiết', value: '1.000.000', percentage: '55%'},
        { id: '2', name: 'Đào tạo', value: '1.000.000', percentage: '10%' },
        { id: '3', name: 'Cần thiết', value: '1.000.000', percentage: '55%' },
        { id: '4', name: 'Đào tạo', value: '1.000.000', percentage: '10%' },
        { id: '5', name: 'Cần thiết', value: '1.000.000', percentage: '55%' },
        { id: '6', name: 'Đào tạo', value: '1.000.000', percentage: '10%' },
    ];

   
    const renderCategoryItem = ({ item, index }: { item: Category, index: number }) => {
        const backgroundColor = COLORS_BG_CATEGORY[index % COLORS_BG_CATEGORY.length];
        return (
            <TouchableOpacity style={[styles.categoryBtn, { backgroundColor: backgroundColor }]}>
                 <ImageBackground style={{flex:1,padding: 15,}} source={backgrounds.bg_item_category}>
                    <Text style={styles.categoryName}>{item.name}</Text>
                    <Text style={styles.categoryValue}>{item.value}</Text>
                    <Text style={styles.categoryPercentage}>{item.percentage}</Text>
                 </ImageBackground>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginHorizontal: 16, marginTop: 20 }}>
            <Text style={styles.categoryTitle}>Chi theo phân loại</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.addCategoryBtn}>
                    <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </View>
    );
};
export default memo(CategoryList, isEqual);

const styles = StyleSheet.create({
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    listContainer: {
        paddingVertical: 10,
    },
    addCategoryBtn: {
        width: 60,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#EEF1F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
    },
    addBtnText: {
        fontSize: 40,
        color: '#B0B0B0',
    },
    categoryBtn: {
        width: 120,
        height: 120,
        borderRadius: 16,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginRight: 10,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    categoryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    categoryPercentage: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.8,
        marginTop: 5,
    },
});