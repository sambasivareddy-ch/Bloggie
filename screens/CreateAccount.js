import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useState, useEffect, useContext } from "react";

import InputField from "../components/InputField";
import AppButton from "../components/AppButton";
import PressableText from "../components/PressableText";
import { createAccount } from "../utils/request";
import Loading from "../components/Loading";

import { ThemeContext } from "../context/themeContext";
import { darkThemeColor, lightThemeColor } from "../utils/themeColors";

const CreateAccount = ({ navigation }) => {
    const { darkMode } = useContext(ThemeContext);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmedPassword, setUserConfirmedPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHasError(false);
        }, 3000);
    }, [hasError]);

    const loginPageHandler = () => {
        navigation.navigate("Login");
    };

    const formSubmitHandler = async () => {
        if (!userEmail || !userPassword || !userConfirmedPassword) {
            Alert.alert("Invalid Input", "Please enter all the data");
            return;
        }

        if (userPassword !== userConfirmedPassword) {
            Alert.alert("Password Mismatch", "Please check the passwords");
            return;
        }

        try {
            setIsLoading(true);
            await createAccount(userEmail, userPassword);
            navigation.navigate("Login");
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    let content = <Loading text={"Creating the account..."} />;

    if (!isLoading) {
        content = (
            <KeyboardAvoidingView
                enabled={true}
                behavior="padding"
                style={styles.view}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.signInContainer, themeBasedColors]}>
                        <View style={styles.formContainer}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    darkMode && { color: "#fff" },
                                ]}
                            >
                                Create Account
                            </Text>
                            <InputField
                                placeholder={"Email Address"}
                                keyboardType={"email-address"}
                                isPassword={false}
                                ariaLabel={"EmailAddress"}
                                value={userEmail}
                                changeHandler={setUserEmail}
                            />
                            <InputField
                                placeholder={"Password"}
                                keyboardType={"default"}
                                isPassword={!showPassword}
                                ariaLabel={"Password"}
                                value={userPassword}
                                changeHandler={setUserPassword}
                            />
                            <InputField
                                placeholder={"Confirm Password"}
                                keyboardType={"default"}
                                isPassword={!showPassword}
                                ariaLabel={"ConfirmPassword"}
                                value={userConfirmedPassword}
                                changeHandler={setUserConfirmedPassword}
                            />
                            {!showPassword && (
                                <PressableText
                                    text={"Show Password"}
                                    color={darkMode ? "#fff" : "#000"}
                                    onPress={() => {
                                        setShowPassword(true);
                                    }}
                                />
                            )}
                            {showPassword && (
                                <PressableText
                                    text={"Hide Password"}
                                    color={darkMode ? "#fff" : "#000"}
                                    onPress={() => {
                                        setShowPassword(false);
                                    }}
                                />
                            )}
                            <AppButton
                                text={"Create Account"}
                                onPress={formSubmitHandler}
                                withBorder={true}
                            />
                            {hasError && (
                                <Text style={styles.errorMessage}>
                                    Invalid Credentials
                                </Text>
                            )}
                            <AppButton
                                text={"Click to Login"}
                                onPress={loginPageHandler}
                                withBorder={false}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return content;
};

export default CreateAccount;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#fff",
    },
    signInContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        gap: 20,
        width: "80%",
    },
    formTitle: {
        fontFamily: "Raleway",
        fontSize: 32,
    },
    errorMessage: {
        color: "#f44336",
        fontSize: 18,
        fontFamily: "Poppins",
    },
});
