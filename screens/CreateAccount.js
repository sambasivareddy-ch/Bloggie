import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useState } from "react";

import InputField from "../components/InputField";
import AppButton from "../components/AppButton";
import { createAccount } from "../utils/request";
import Loading from "../components/Loading";

const CreateAccount = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmedPassword, setUserConfirmedPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loginPageHandler = () => {
        navigation.navigate("Login");
    };

    const formSubmitHandler = async () => {
        if (!userEmail || !userPassword || !userConfirmedPassword) {
            Alert.alert("Invalid Input", "Please enter all the data");
        }

        if (userPassword !== userConfirmedPassword) {
            Alert.alert("Password Mismatch", "Please check the passwords");
        }

        try {
            setIsLoading(true);
            await createAccount(userEmail, userPassword);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }

        navigation.navigate('Login')
    };

    let content = <Loading text={"Creating the account..."} />;

    if (!isLoading) {
        content = (
            <KeyboardAvoidingView
                enabled={true}
                behavior="padding"
                style={styles.view}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.signInContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>Create Account</Text>
                            <InputField
                                placeholder={"Email Address"}
                                keyboardType={"email-address"}
                                isPassword={false}
                                ariaLabel={"EmailAddress"}
                                changeHandler={setUserEmail}
                            />
                            <InputField
                                placeholder={"Password"}
                                keyboardType={"default"}
                                isPassword={true}
                                ariaLabel={"Password"}
                                changeHandler={setUserPassword}
                            />
                            <InputField
                                placeholder={"Confirm Password"}
                                keyboardType={"default"}
                                isPassword={true}
                                ariaLabel={"ConfirmPassword"}
                                changeHandler={setUserConfirmedPassword}
                            />
                            <AppButton
                                text={"Create Account"}
                                onPress={formSubmitHandler}
                                withBorder={true}
                            />
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
});
