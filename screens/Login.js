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
import PressableText from "../components/PressableText";
import { loginIntoAccount } from "../utils/request";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";
import { darkThemeColor, lightThemeColor } from "../utils/themeColors";

const Login = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showPassword, setShowPasswords] = useState(false);

    const { login } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        setTimeout(() => {
            setHasError(false);
        }, 3000);
    }, [hasError]);

    const createAccountChangeHandler = () => {
        navigation.navigate("SignUp");
    };

    const passwordChangeHandler = () => {
        navigation.navigate("ResetPassword");
    };

    const formSubmitHandler = async () => {
        if (!userEmail || !userPassword) {
            Alert.alert("Invalid Input", "Please enter all the data");
            return;
        }

        try {
            setIsLoading(true);
            const info = await loginIntoAccount(userEmail, userPassword);

            if (info && info?.token && info?.email && info?.uid) {
                login(info.token, info.email, info.uid);
            }
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    let content = <Loading text={"Login into account...."} />;

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
                                Login
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
                            {!showPassword && (
                                <PressableText
                                    color={darkMode ? "#fff" : "#000"}
                                    text={"Show Password"}
                                    onPress={() => {
                                        setShowPasswords(true);
                                    }}
                                />
                            )}
                            {showPassword && (
                                <PressableText
                                    color={darkMode ? "#fff" : "#000"}
                                    text={"Hide Password"}
                                    onPress={() => {
                                        setShowPasswords(false);
                                    }}
                                />
                            )}
                            <AppButton
                                text={"Login into Account"}
                                onPress={formSubmitHandler}
                                withBorder={true}
                            />
                            {hasError && (
                                <Text style={styles.errorMessage}>
                                    Invalid Credentials
                                </Text>
                            )}
                            <AppButton
                                text={"Forget Password?"}
                                onPress={passwordChangeHandler}
                                withBorder={false}
                            />
                            <AppButton
                                text={"Click to Create"}
                                onPress={createAccountChangeHandler}
                                withBorder={false}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return <View style={styles.view}>{content}</View>;
};

export default Login;

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
