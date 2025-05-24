import { View, Text, StyleSheet, Pressable } from "react-native";

const PressableText = ({ text, onPress, color }) => {
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
            <View style={styles.buttonContainer}>
                <Text
                    style={[
                        styles.buttonText,
                        color && { color: color, fontSize: 18 },
                    ]}
                >
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

export default PressableText;

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
    },
    buttonText: {
        color: "#000",
        fontFamily: "Poppins",
    },
});
