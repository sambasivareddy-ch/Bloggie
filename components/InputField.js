import { TextInput, StyleSheet } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";

const InputField = ({
    placeholder,
    keyboardType,
    isPassword,
    ariaLabel,
    changeHandler,
    value,
}) => {
    const { darkMode } = useContext(ThemeContext);

    const inputChangeHandler = (enteredInput) => {
        changeHandler(enteredInput);
    };
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={darkMode ? "#fff" : "#000"}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
            spellCheck={false}
            autoCorrect={false}
            aria-label={ariaLabel}
            onChangeText={inputChangeHandler}
            value={value}
            style={[
                styles.input,
                darkMode && {
                    color: "#fff",
                    borderColor: "#fff",
                },
            ]}
        />
    );
};

export default InputField;

const styles = StyleSheet.create({
    input: {
        padding: 15,
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        fontFamily: "Poppins",
    },
});
