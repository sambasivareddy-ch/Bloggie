import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { ThemeContext } from "../context/themeContext";
import { darkThemeColor, lightThemeColor } from "../utils/themeColors";

const Tag = ({ text, onPress }) => {
    const { darkMode } = useContext(ThemeContext);

    const pressHandler = () => {
        onPress(text);
    };

    const themeBasedColors = darkMode ? lightThemeColor : darkThemeColor;

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
            <View style={[styles.tag, themeBasedColors]}>
                <EvilIcons
                    name="tag"
                    size={16}
                    color={darkMode ? "#000" : "#fff"}
                />
                <Text style={[styles.tagText, themeBasedColors]}>{text}</Text>
            </View>
        </Pressable>
    );
};

export default Tag;

const styles = StyleSheet.create({
    tag: {
        backgroundColor: "#000",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tagText: {
        color: "#fff",
        fontSize: 12,
        textTransform: "capitalize",
    },
});
