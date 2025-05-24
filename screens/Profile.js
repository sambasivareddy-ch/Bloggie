import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import PressableText from "../components/PressableText";
import { AuthContext } from "../context/authContext";
import { BiometricContext } from "../context/biometricContext";
import { ThemeContext } from "../context/themeContext";
import { deleteAccount } from "../utils/request";
import { darkThemeColor, lightThemeColor } from "../utils/themeColors";

const Profile = ({ navigation }) => {
    const { authState, logout } = useContext(AuthContext);
    const { enabled, enableBiometric, disableBiometric } =
        useContext(BiometricContext);
    const { darkMode, enableDarkMode, disbaleDarkMode } =
        useContext(ThemeContext);

    const pressHandler = () => {
        logout();
    };

    const emailChangeHandler = () => {
        navigation.navigate("ChangeEmail");
    };

    const passwordChangeHandler = () => {
        navigation.navigate("ChangePassword");
    };

    const deleteAccountHandler = async () => {
        try {
            await deleteAccount(authState.authToken);
            logout();
        } catch (err) {
            console.error("Error occurred during deletion of account");
        }
    };

    const biometricsChangeHandler = () => {
        if (enabled) {
            disableBiometric();
        } else {
            enableBiometric();
        }
    };

    const themeChangeHandler = () => {
        if (darkMode) {
            disbaleDarkMode();
        } else {
            enableDarkMode();
        }
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    return (
        <View style={[styles.profileContainer, themeBasedColors]}>
            <View style={[styles.profile, themeBasedColors]}>
                <Text style={[styles.email, themeBasedColors]}>
                    {authState.email}
                </Text>
                <Text style={[styles.uid, themeBasedColors]}>
                    UID: {authState.uid}
                </Text>
            </View>
            <View style={styles.profileSettings}>
                <View style={styles.settingHeader}>
                    <Ionicons
                        name="settings-outline"
                        size={28}
                        color={darkMode ? "#fff" : "#000"}
                    />
                    <Text style={[styles.setting, themeBasedColors]}>
                        Settings
                    </Text>
                </View>
                <View style={styles.settings}>
                    <PressableText
                        text="Change Email"
                        color={darkMode ? "#fff" : "#000"}
                        onPress={emailChangeHandler}
                    />
                    <PressableText
                        text="Change Password"
                        color={darkMode ? "#fff" : "#000"}
                        onPress={passwordChangeHandler}
                    />
                    <PressableText
                        text={`${!enabled ? "Enable" : "Disable"} Biometrics`}
                        color={darkMode ? "#fff" : "#000"}
                        onPress={biometricsChangeHandler}
                    />
                    <PressableText
                        text={`${!darkMode ? "Enable" : "Disable"} Dark Mode`}
                        color={darkMode ? "#fff" : "#000"}
                        onPress={themeChangeHandler}
                    />
                    <PressableText
                        text="Logout"
                        color={darkMode ? "#fff" : "#4703d1"}
                        onPress={pressHandler}
                    />
                    <PressableText
                        text="Delete Account"
                        color={"#f44336"}
                        onPress={deleteAccountHandler}
                    />
                </View>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    profile: {
        flex: 1,
        gap: 15,
        padding: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#fafafa",
    },
    email: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Raleway",
    },
    uid: {
        fontFamily: "Poppins",
    },
    profileSettings: {
        flex: 5,
        alignItems: "flex-start",
        padding: 20,
        gap: 20,
    },
    settingHeader: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    setting: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Raleway",
    },
    settings: {
        gap: 40,
    },
});
