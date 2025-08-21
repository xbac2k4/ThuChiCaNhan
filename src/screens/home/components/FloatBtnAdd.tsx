import React, { useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import IconMT from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import Block from 'components/base/Block';
import Text from 'components/base/Text';
import { colors } from 'constants/theme';
import Icons from 'common/icons';

interface FloatingActionButtonProps {
    onAddIncome?: () => void;
    onAddExpense?: () => void;
}

const FloatBtnAdd: React.FC<FloatingActionButtonProps> = ({
    onAddIncome,
    onAddExpense,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;
        Animated.parallel([
            Animated.timing(anim1, {
                toValue,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(anim2, {
                toValue,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        setIsOpen(!isOpen);
    };

    return (
        <Block style={styles.container}>
            <Animated.View
                style={[
                    styles.subFab,
                    {
                        transform: [
                            {
                                translateY: anim1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -130],
                                }),
                            },
                        ],
                    },
                ]}>
                {isOpen && (
                    <Block minWidth={60} style={styles.label}>
                        <Text style={styles.labelText}>Thu nhập</Text>
                    </Block>
                )}
                <TouchableOpacity style={[styles.fab, { backgroundColor: colors.BG_GREEN1 }]} onPress={onAddIncome}>
                    <IconMT name={Icons.plus} size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View
                style={[
                    styles.subFab,
                    {
                        transform: [
                            {
                                translateY: anim2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -65],
                                }),
                            },
                        ],
                    },
                ]}>
                {isOpen && (
                    <Block minWidth={60} style={styles.label}>
                        <Text style={styles.labelText}>Chi phí</Text>
                    </Block>
                )}
                <TouchableOpacity style={[styles.fab, { backgroundColor: colors.RED2 }]} onPress={onAddExpense}>
                    <IconMT name={Icons.minus} size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
                <IconMT name={isOpen ? Icons.close : Icons.plus} size={24} color="white" />
            </TouchableOpacity>
        </Block>
    );
};

export default FloatBtnAdd;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.BG_GREEN2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    subFab: {
        position: 'absolute',
        alignItems: 'center'
    },
    label: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        left: -70,
    },
    labelText: {
        textAlign: 'right',
    },
});
