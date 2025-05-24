import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import InputField from "../components/InputField";
import AppButton from "../components/AppButton";
import Loading from "../components/Loading";
import {
    changeAccountEmail,
    changeAccountPassword,
    resetPasswordWithEmail,
} from "../utils/request";

import { AuthContext } from "../context/authContext";
import { ThemeContext, ThemeProvider } from "../context/themeContext";
import { darkThemeColor, lightThemeColor } from "../utils/themeColors";

export const ChangePassword = ({ navigation }) => {
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { authState, login } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        setTimeout(() => {
            setHasError(false);
        }, 3000);
    }, [hasError]);

    const formSubmitHandler = async () => {
        if (!userPassword) {
            Alert.alert("Invalid Input", "Please enter the password");
            return;
        }

        try {
            setIsLoading(true);
            const info = await changeAccountPassword(
                userPassword,
                authState.authToken
            );

            if (info && info?.token && info?.email && info?.uid) {
                login(info.token, info.email, info.uid);
                navigation.navigate("Main");
            }
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    let content = <Loading text={"Updating the password...."} />;

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
                                Change Password
                            </Text>
                            <InputField
                                placeholder={"New Password"}
                                keyboardType={"default"}
                                isPassword={true}
                                ariaLabel={"Password"}
                                value={userPassword}
                                changeHandler={setUserPassword}
                            />
                            <AppButton
                                text={"Update Password"}
                                onPress={formSubmitHandler}
                                withBorder={true}
                            />
                            {hasError && (
                                <Text
                                    style={[
                                        styles.errorMessage,
                                        darkMode && { color: "#fff" },
                                    ]}
                                >
                                    Invalid Credentials
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return <View style={styles.view}>{content}</View>;
};

export const ChangeEmail = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { authState, login } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        setTimeout(() => {
            setHasError(false);
        }, 3000);
    }, [hasError]);

    const formSubmitHandler = async () => {
        if (!userEmail) {
            Alert.alert("Invalid Input", "Please enter the email");
            return;
        }

        try {
            setIsLoading(true);
            const info = await changeAccountEmail(
                userEmail,
                authState.authToken
            );
            if (info && info?.token && info?.email && info?.uid) {
                login(info.token, info.email, info.uid);
                navigation.navigate("Main");
            }
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    let content = <Loading text={"Updating the email...."} />;

    if (!isLoading) {
        content = (
            <KeyboardAvoidingView
                enabled={true}
                behavior="padding"
                style={[styles.view, darkMode && { backgroundColor: "#000" }]}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.signInContainer}>
                        <View style={styles.formContainer}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    darkMode && { color: "#fff" },
                                ]}
                            >
                                Change Email
                            </Text>
                            <InputField
                                placeholder={"Email Address"}
                                keyboardType={"email-address"}
                                isPassword={false}
                                ariaLabel={"EmailAddress"}
                                value={userEmail}
                                changeHandler={setUserEmail}
                            />
                            <AppButton
                                text={"Update Email"}
                                onPress={formSubmitHandler}
                                withBorder={true}
                            />
                            {hasError && (
                                <Text
                                    style={[
                                        styles.errorMessage,
                                        darkMode && { color: "#fff" },
                                    ]}
                                >
                                    Invalid Credentials
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return <View style={styles.view}>{content}</View>;
};

export const ResetPasswordWithEmail = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { authState, login } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        setTimeout(() => {
            setHasError(false);
        }, 3000);
    }, [hasError]);

    const formSubmitHandler = async () => {
        if (!userEmail) {
            Alert.alert(
                "Invalid Input",
                "Please enter all the input in all fields"
            );
            return;
        }

        try {
            setIsLoading(true);
            const info = await resetPasswordWithEmail(userEmail);

            if (info) {
                navigation.navigate("Login");
            }
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    let content = <Loading text={"Sending the reset email...."} />;

    if (!isLoading) {
        content = (
            <KeyboardAvoidingView
                enabled={true}
                behavior="padding"
                style={[styles.view, themeBasedColors]}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.signInContainer}>
                        <View style={styles.formContainer}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    darkMode && { color: "#fff" },
                                ]}
                            >
                                Reset Password with Email
                            </Text>
                            <InputField
                                placeholder={"Email Address"}
                                keyboardType={"email-address"}
                                ariaLabel={"Email"}
                                value={userEmail}
                                changeHandler={setUserEmail}
                            />
                            <AppButton
                                text={"Reset"}
                                onPress={formSubmitHandler}
                                withBorder={true}
                            />
                            {hasError && (
                                <Text
                                    style={[
                                        styles.errorMessage,
                                        darkMode && { color: "#fff" },
                                    ]}
                                >
                                    Invalid Email Address
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return <View style={styles.view}>{content}</View>;
};

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
        fontSize: 24,
        // fontWeight: 'bold'
    },
    errorMessage: {
        color: "#f44336",
        fontSize: 18,
        fontFamily: "Poppins",
    },
});
