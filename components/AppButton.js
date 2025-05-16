import { View, Text, StyleSheet, Pressable } from "react-native";

const AppButton = ({ text, onPress, withBorder }) => {
    const pressHandler = () => {
        onPress();
    };

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
                style={
                    withBorder
                        ? styles.buttonContainer
                        : styles.buttonContainerWithoutBorder
                }
            >
                <Text
                    style={[
                        styles.buttonText,
                        !withBorder && { color: "#4703d1", textAlign: "right", fontSize: 18 },
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
