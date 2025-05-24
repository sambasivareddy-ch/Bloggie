import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import { lightThemeColor, darkThemeColor } from "../utils/themeColors";

const Loading = ({ text }) => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <View style={[styles.loadingContainer, darkMode && darkThemeColor]}>
            <View style={darkMode && darkThemeColor}>
                <ActivityIndicator
                    size={"large"}
                    color={darkMode && { color: "#fff" }}
                />
                <Text
                    style={[styles.loadMessage, darkMode && { color: "#fff" }]}
                >
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadMessage: {
        fontFamily: "Poppins",
        fontSize: 18,
        marginVertical: 20,
    },
});
