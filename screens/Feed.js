import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useState, useLayoutEffect, useContext, useEffect } from "react";

import { AuthContext } from "../context/authContext";
import IconButton from "../components/IconButton";
import InputField from "../components/InputField";
import FeedCard from "../components/FeedCard";
import Loading from "../components/Loading";
import { getBlogsFromFirebase } from "../utils/request";

const Feed = ({ route, navigation }) => {
    const params = route.params;
    const { authState } = useContext(AuthContext);
    const [userBlogs, setUserBlogs] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserPost = async () => {
            try {
                setIsLoading(true);
                const blogs = await getBlogsFromFirebase(
                    authState.uid,
                    authState.authToken
                );
                const dataArray = blogs ? Object.entries(blogs).map(([id, item]) => ({
                    id,
                    ...item,
                })): [];
                setUserBlogs(dataArray);
                setData(dataArray);
            } catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        };

        fetchUserPost();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    iconName={"add"}
                    size={28}
                    onPress={() => navigation.navigate("Editor")}
                />
            ),
        });
    }, [navigation]);

    const openBlogPostHandler = (id) => {
        navigation.navigate("Blog", { id });
    };

    const searchHandler = (searchText) => {
        if (searchText.trim()) {
            const lowerSearch = searchText.toLowerCase();
            const filteredBlogs = data.filter((blog) => {
                const tagMatch = blog.tags.some((tag) =>
                    tag.toLowerCase().includes(lowerSearch)
                );
                const titleMatch = blog.title
                    .toLowerCase()
                    .includes(lowerSearch);
                return tagMatch || titleMatch;
            });
            setData(filteredBlogs);
        } else {
            setData(userBlogs);
        }
    };

    let content = <Loading text={params && params.loading ? params.loading  : "Loading the feed..."}/>;

    if (!isLoading) {
        content = (
            <View style={styles.feedContainer}>
                <View style={styles.feedHeader}>
                    <InputField
                        placeholder={"Search with Tag or Title"}
                        isPassword={false}
                        keyboardType={"default"}
                        ariaLabel={"FeedSearch"}
                        changeHandler={searchHandler}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Your Blogs</Text>
                    {data.length > 0 && (
                        <View style={styles.feeds}>
                            <FlatList
                                data={data.sort((a, b) => b.date - a.date)}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <FeedCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        tags={item.tags}
                                        date={item.date}
                                        onPress={openBlogPostHandler}
                                    />
                                )}
                            />
                        </View>
                    )}
                    {userBlogs.length === 0 && (
                        <Text style={styles.noBlogsText}>
                            You don't have any blogs
                        </Text>
                    )}
                </View>
            </View>
        );
    }

    return content;
};

export default Feed;

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        padding: 20,
        boxSizing: "border-box",
        backgroundColor: "#fff",
    },
    feedHeader: {
        marginBottom: 20,
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: "RalewayBold",
        marginBottom: 15,
    },
    feeds: {
        marginBottom: 40,
    },
    noBlogsText: {
        fontSize: 18,
        fontFamily: "Poppins",
    },
});
