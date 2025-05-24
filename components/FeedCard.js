import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import Tag from "./Tag";
import { darkThemeColor, lightThemeColor } from "../utils/themeColors";

const FeedCard = ({ id, title, date, tags, onPress, tagPressHandler }) => {
    const { darkMode } = useContext(ThemeContext);

    const pressHandler = () => {
        onPress(id);
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    return (
        <View>
            <View style={[styles.feedCard, themeBasedColors]}>
                <Pressable
                    android_ripple={true}
                    onPress={pressHandler}
                    style={({ pressed }) =>
                        pressed && {
                            opacity: 0.7,
                        }
                    }
                >
                    <Text
                        style={[
                            styles.feedTitle,
                            themeBasedColors,
                            darkMode && { textDecorationColor: "#fff" },
                            darkMode && { shadowColor: "#fff" },
                        ]}
                    >
                        {title}
                    </Text>
                </Pressable>
                {date && (
                    <Text style={[styles.feedText, themeBasedColors]}>
                        Date: {new Date(date).toString()}
                    </Text>
                )}
                <View style={styles.tags}>
                    {tags &&
                        tags.map((tag) => {
                            return (
                                <Tag
                                    text={tag}
                                    key={Math.random()}
                                    onPress={tagPressHandler}
                                />
                            );
                        })}
                </View>
            </View>
        </View>
    );
};

export default FeedCard;

const styles = StyleSheet.create({
    feedCard: {
        width: "100%",
        padding: 20,
        boxSizing: "border-box",
        backgroundColor: "#fff",
        borderColor: "#000",
        marginVertical: 5,
        gap: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    feedTitle: {
        fontFamily: "RalewayBold",
        fontSize: 18,
        color: "#4703d1",
        textDecorationLine: "underline",
        textDecorationColor: "#000",
    },
    feedText: {
        fontFamily: "Poppins",
        color: "#45444c",
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginVertical: 10,
    },
});
