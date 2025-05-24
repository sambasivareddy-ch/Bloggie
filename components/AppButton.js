import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import { lightThemeColor, darkThemeColor } from "../utils/themeColors";

const AppButton = ({ text, onPress, withBorder, propStyles = {} }) => {
    const { darkMode } = useContext(ThemeContext);

    const pressHandler = () => {
        onPress();
    };

    const baseStyles = withBorder
        ? styles.buttonContainer
        : styles.buttonContainerWithoutBorder;
    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

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
            <View
                style={[
                    baseStyles,
                    propStyles,
                    darkMode && withBorder && { backgroundColor: "#fff" },
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        !withBorder && {
                            color: "#4703d1",
                            textAlign: "right",
                            fontSize: 18,
                        },
                        darkMode && withBorder && { color: "#000" },
                    ]}
                >
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

export default AppButton;

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        padding: 15,
        backgroundColor: "#000",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonContainerWithoutBorder: {
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins",
        textAlign: "center",
    },
});
