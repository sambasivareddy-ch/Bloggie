import { View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemeContext } from "../context/themeContext";

const IconButton = ({ iconName, onPress, size }) => {
    const { darkMode } = useContext(ThemeContext);
    const pressHandler = () => {
        onPress();
    };

    return (
        <Pressable
            android_ripple={true}
            onPress={pressHandler}
            style={({ pressed }) =>
                pressed && {
                    opacity: 0.7,
                }
            }
        >
            <View style={styles.icon}>
                <Ionicons
                    name={iconName}
                    size={size}
                    color={darkMode ? "#fff" : "#000"}
                />
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 5,
    },
});
