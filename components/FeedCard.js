import { View, Text, StyleSheet, Pressable } from "react-native";

import Tag from "./Tag";

const FeedCard = ({ title, preview, date, tags, onPress }) => {
    const pressHandler = () => {
        onPress();
    };

    console.log(title)

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
            <View style={styles.feedCard}>
                <Text style={styles.feedTitle}>{title}</Text>
                <Text style={styles.feedText}>{preview}</Text>
                <Text style={styles.feedText}>Date: {new Date().toLocaleString()}</Text>
                <View style={styles.tags}>
                    {tags && tags.map((tag) => {
                        return <Tag text={tag} key={Math.random()}/>
                    })}
                </View>
            </View>
        </Pressable>
    );
};

export default FeedCard;

const styles = StyleSheet.create({
    feedCard: {
        width: '100%',
        padding: 20,
        boxSizing: 'border-box',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        gap: 10,
    },
    feedTitle: {
        fontFamily: 'Poppins',
        fontSize: 18,
    },
    feedText: {
        fontFamily: 'Poppins'
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginVertical: 10,
    }
});
