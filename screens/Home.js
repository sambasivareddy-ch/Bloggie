import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import { lightThemeColor, darkThemeColor } from "../utils/themeColors";
import AppButton from "../components/AppButton";

const Home = ({ navigation }) => {
    const { darkMode } = useContext(ThemeContext);

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    const buttonPressHandler = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={[styles.homeContainer, themeBasedColors]}>
            <View style={styles.container}>
                <Text style={[styles.appName, darkMode && { color: "#fff" }]}>
                    Bloggie
                </Text>
                <View style={styles.motto}>
                    <Text
                        style={[
                            styles.mottoText,
                            darkMode && { color: "#fff" },
                        ]}
                    >
                        Your Stories.
                    </Text>
                    <Text
                        style={[
                            styles.mottoText,
                            darkMode && { color: "#fff" },
                        ]}
                    >
                        Your Thoughts.
                    </Text>
                    <Text
                        style={[
                            styles.mottoText,
                            darkMode && { color: "#fff" },
                        ]}
                    >
                        Your Space
                    </Text>
                </View>
                <AppButton
                    text={"Start Writing"}
                    onPress={buttonPressHandler}
                    withBorder={true}
                />
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
    },
    container: {
        gap: 20,
    },
    appName: {
        fontFamily: "Raleway",
        fontSize: 64,
    },
    motto: {
        flexDirection: "row",
        gap: 10,
    },
    mottoText: {
        fontSize: 16,
        fontFamily: "Poppins",
    },
});
