import { TextInput, View, StyleSheet } from "react-native";

const InputField = ({
    placeholder,
    keyboardType,
    isPassword,
    ariaLabel,
    changeHandler,
    value
}) => {
    const inputChangeHandler = (enteredInput) => {
        changeHandler(enteredInput);
    };
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#000"}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
            spellCheck={false}
            autoCorrect={false}
            aria-label={ariaLabel}
            onChangeText={inputChangeHandler}
            value={value}
            style={styles.input}
        />
    );
};

export default InputField;

const styles = StyleSheet.create({
    input: {
        padding: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5, 
        fontFamily: 'Poppins'
    }
});
