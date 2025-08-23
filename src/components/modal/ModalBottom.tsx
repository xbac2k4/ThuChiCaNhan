import Spacer from 'components/base/Spacer';
import { colors } from 'constants/theme';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Line } from 'react-native-svg';

type Option = {
    title: string;
    onPress: () => void;
};

type CustomModalProps = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    options: Option[];
};

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, options, title }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <Animatable.View
                    animation="slideInUp"
                    duration={300}
                    style={styles.modalContent}>
                    <View style={styles.modalOption}>
                        {
                            title &&
                            <View style={{
                                ...styles.modalTitle,
                                borderBottomColor: colors.GRAY2,
                                width: '90%',
                                borderBottomWidth: 1
                            }}>
                                <Text style={styles.modalTitle}>{title}</Text>
                            </View>
                        }
                        {Array.isArray(options) && options.map((opt, index) => (
                            <View
                                key={index}
                                style={{ width: '100%', borderBottomColor: '#000000' }}>
                                <TouchableOpacity
                                    style={{ ...styles.modalOption, marginBottom: 0, width: '100%' }}
                                    onPress={() => {
                                        opt.onPress();
                                        onClose();
                                    }}>
                                    <Text style={styles.modalOptionText}>{opt.title}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
                        <Text style={styles.modalCancelText}>Hủy bỏ</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </Modal >
    );
};

export default CustomModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: colors.GRAY,
        paddingVertical: 5
    },
    modalOption: {
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 18,
        fontWeight: '400',
    },
    modalCancel: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    modalCancelText: {
        fontSize: 18,
        color: 'red',
        fontWeight: '400',
    },
});
