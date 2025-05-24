import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    Pressable,
} from "react-native";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";
import IconButton from "../components/IconButton";
import InputField from "../components/InputField";
import FeedCard from "../components/FeedCard";
import Loading from "../components/Loading";
import { getBlogsFromFirebase } from "../utils/request";
import { lightThemeColor, darkThemeColor } from "../utils/themeColors";

const Feed = ({ route, navigation }) => {
    const params = route.params;
    const { authState } = useContext(AuthContext);
    const [userBlogs, setUserBlogs] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchUserPost = async () => {
            try {
                setIsLoading(true);
                const blogs = await getBlogsFromFirebase(
                    authState.uid,
                    authState.authToken
                );
                const dataArray = blogs
                    ? Object.entries(blogs).map(([id, item]) => ({
                          id,
                          ...item,
                      }))
                    : [];
                setUserBlogs(dataArray);
                setData(dataArray);
                setSelectedTags([]);
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

    const tagPressHandler = (tag) => {
        if (!selectedTags.includes(tag))
            setSelectedTags([tag, ...selectedTags]);
    };

    useEffect(() => {
        if (selectedTags.length) {
            const filteredBlogs = userBlogs.filter((blog) => {
                const tagsLength = selectedTags.length;
                for (let i = 0; i < tagsLength; i++) {
                    if (blog.tags.includes(selectedTags[i])) {
                        return true;
                    }
                }
                return false;
            });
            setData(filteredBlogs);
        } else {
            setData(userBlogs);
        }
    }, [selectedTags]);

    const searchHandler = (searchText) => {
        if (searchText.trim()) {
            const lowerSearch = searchText.toLowerCase();
            const filteredBlogs = userBlogs.filter((blog) => {
                const titleMatch = blog.title
                    .toLowerCase()
                    .includes(lowerSearch);
                return titleMatch;
            });
            setData(filteredBlogs);
        } else {
            setData(userBlogs);
        }
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    let content = (
        <Loading
            text={
                params && params.loading
                    ? params.loading
                    : "Loading the feed..."
            }
        />
    );

    if (!isLoading) {
        content = (
            <View style={[styles.feedContainer, themeBasedColors]}>
                <View style={styles.feedHeader}>
                    <InputField
                        placeholder={"Search with Title"}
                        isPassword={false}
                        keyboardType={"default"}
                        ariaLabel={"FeedSearch"}
                        changeHandler={searchHandler}
                    />
                </View>
                {selectedTags.length > 0 && (
                    <View style={styles.selectedTagsWrapper}>
                        {selectedTags.map((tag) => {
                            return (
                                <Pressable
                                    key={Math.random()}
                                    onPress={() => {
                                        setSelectedTags(
                                            selectedTags.filter(
                                                (select) => select !== tag
                                            )
                                        );
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.selected,
                                            darkMode && { borderColor: "#fff" },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.tagName,
                                                darkMode && { color: "#fff" },
                                            ]}
                                        >
                                            {tag}
                                        </Text>
                                        <Ionicons
                                            name="close-outline"
                                            size={16}
                                            color={
                                                darkMode ? "#fff" : "#4703d1"
                                            }
                                        />
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                )}
                <View>
                    <Text style={[styles.title, themeBasedColors]}>
                        Your Blogs
                    </Text>
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
                                        tagPressHandler={tagPressHandler}
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
                    {userBlogs.length !== 0 && data.length === 0 && (
                        <Text style={styles.noBlogsText}>
                            No matching blogs...
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
        marginBottom: 10,
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
    selectedTagsWrapper: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },
    selected: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        borderWidth: 1,
        borderColor: "#4703d1",
        padding: 5,
    },
    tagName: {
        fontSize: 12,
        color: "#4703d1",
    },
});
