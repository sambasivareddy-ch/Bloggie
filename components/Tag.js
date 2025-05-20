import { View, Text, StyleSheet, Pressable } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Tag = ({ text, onPress }) => {
    const pressHandler = () => {
        onPress(text)
    }

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
            <View style={styles.tag}>
                <EvilIcons name="tag" size={16} color={"white"} />
                <Text style={styles.tagText}>{text}</Text>
            </View>
        </Pressable>
    );
};

export default Tag;

const styles = StyleSheet.create({
    tag: {
        backgroundColor: "#000",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tagText: {
        color: "#fff",
        fontSize: 12,
        textTransform: "capitalize",
    },
});
