import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useState } from "react";

import InputField from "../components/InputField";
import AppButton from "../components/AppButton";

const CreateAccount = ({ route, navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmedPassword, setUserConfirmedPassword] = useState("");
    const [userName, setUserName] = useState("");

    const loginPageHandler = () => {
        navigation.navigate('Login')
    }

    const formSubmitHandler = () => {
        console.log({
            userEmail,
            userPassword,
            userConfirmedPassword,
            userName,
        });
    };

    return (
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
                            placeholder={"User Name"}
                            keyboardType={"default"}
                            isPassword={false}
                            ariaLabel={"UserName"}
                            changeHandler={setUserName}
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
