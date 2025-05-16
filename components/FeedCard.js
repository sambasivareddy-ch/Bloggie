import { View, Text, StyleSheet, Pressable } from "react-native";

import Tag from "./Tag";

const FeedCard = ({ id, title, date, tags, onPress }) => {
    const pressHandler = () => {
        onPress(id);
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
            <View style={styles.feedCard}>
                <Text style={styles.feedTitle}>{title}</Text>
                <Text style={styles.feedText}>Date: {(new Date(date)).toString()}</Text>
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
        backgroundColor: '#fff',
        borderColor: '#000',
        marginVertical: 5,
        gap: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    feedTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 18,
        color: '#4703d1'
    },
    feedText: {
        fontFamily: 'Poppins',
        color: '#45444c'
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginVertical: 10,
    }
});
