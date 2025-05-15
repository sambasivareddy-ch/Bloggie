import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useState, useLayoutEffect } from "react";

import InputField from "../components/InputField";
import FeedCard from "../components/FeedCard";
import { SampleFeed } from "../data/sample";

const Feed = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
              title="New Post"
              onPress={() => navigation.navigate("Editor")}
            />
          ),
        });
    }, [navigation]);

    return (
        <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
                <InputField
                    placeholder={"Search"}
                    isPassword={false}
                    keyboardType={"default"}
                    ariaLabel={"FeedSearch"}
                    changeHandler={setSearchText}
                />
            </View>
            <View>
                <Text style={styles.title}>Your Blogs</Text>
                <View style={styles.feeds}>
                    <FlatList
                        data={SampleFeed}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <FeedCard
                                key={item.id}
                                title={item.title}
                                preview={item.previewText}
                                tags={item.tags}
                                date={item.createdDate}
                                onPress={() => {}}
                            />
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        padding: 20,
        boxSizing: 'border-box',
        backgroundColor: "#fff",
    },
    feedHeader: {
        marginBottom: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Raleway',
        marginBottom: 15,
    },
    feeds: {
        marginBottom: 40,
    }
});
