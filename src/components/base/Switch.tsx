import React, { useState, useEffect, memo } from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import Block from "./Block";

interface CustomSwitchProps {
    isActive?: boolean;
    onValueChange?: (val: boolean) => void;
    activeColor?: string;
    inactiveColor?: string;
}

const Switch: React.FC<CustomSwitchProps> = ({
    isActive = false,
    onValueChange,
    activeColor = "#4CD964",
    inactiveColor = "#CCC",
}) => {
    const [isOn, setIsOn] = useState(isActive);
    const offsetX = new Animated.Value(isActive ? 22 : 3);

    useEffect(() => {
        Animated.timing(offsetX, {
            toValue: isOn ? 22 : 3,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [isOn]);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        onValueChange && onValueChange(!isOn);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.container,
                { backgroundColor: isOn ? activeColor : inactiveColor },
            ]}
            onPress={toggleSwitch}>
                <Animated.View style={[styles.circle, { left: offsetX }]} />
        </TouchableOpacity>
    );
};

export default memo(Switch);

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 26,
        borderRadius: 14,
        justifyContent: "center",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 11,
        backgroundColor: "#FFFFFF",
        position: "absolute",
    },
});
