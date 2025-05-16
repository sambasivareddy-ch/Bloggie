import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({ iconName, onPress, size }) => {
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
            <View style={styles.icon}>
                <Ionicons name={iconName} size={size}/>
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 5
    }
});
