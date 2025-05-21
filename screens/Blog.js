import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useState, useLayoutEffect, useEffect, useContext } from "react";
import RenderHTML from "react-native-render-html";

import Tag from "../components/Tag";
import IconButton from "../components/IconButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/authContext";
import { getBlogsFromFirebase, deleteBlogFromFirebase } from "../utils/request";

const Blog = ({ route, navigation }) => {
    const { authState } = useContext(AuthContext);
    const [blog, setBlog] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = route.params;
    const { width } = useWindowDimensions();

    const deleteHandler = async () => {
        await deleteBlogFromFirebase(blog.userId, blog.id, authState.authToken)
            .then(() => {
                navigation.navigate("Main", {
                    loading: "Deleting the blog...",
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Blog",
            headerRight: () => (
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <IconButton
                        iconName={"create-outline"}
                        size={20}
                        onPress={() =>
                            navigation.navigate("Editor", {
                                content: blog.content,
                                blogTitle: blog.title,
                                blogTags: blog.tags,
                                docId: blog.id,
                            })
                        }
                    />
                    <IconButton
                        iconName={"trash-outline"}
                        size={20}
                        onPress={deleteHandler}
                    />
                </View>
            ),
        });
    }, [navigation, blog]);

    useEffect(() => {
        const fetchUserPost = async () => {
            try {
                setIsLoading(true);
                const userBlogs = await getBlogsFromFirebase(
                    authState.uid,
                    authState.authToken
                );

                const dataArray = Object.entries(userBlogs).map(
                    ([id, item]) => ({
                        id,
                        ...item,
                    })
                );

                setBlog(dataArray.filter((blog) => blog.id === id)[0]);
            } catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        };

        fetchUserPost();
    }, []);

    let content = <Loading text={"Loading the blog..."} />;

    if (!isLoading && !blog) content = <Text>No content in the blog</Text>;

    if (!isLoading && blog) {
        content = (
            <View style={styles.blogContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{blog.title}</Text>
                    <Text style={styles.date}>
                        Date: {new Date(blog.date).toString()}
                    </Text>
                    <View style={styles.tags}>
                        {blog.tags &&
                            blog.tags.map((tag) => {
                                return (
                                    <Tag
                                        text={tag}
                                        key={Math.random()}
                                        onPress={() => {}}
                                    />
                                );
                            })}
                    </View>
                    <RenderHTML
                        source={{ html: blog.content }}
                        contentWidth={width}
                        tagsStyles={{
                            b: { fontWeight: "bold" },
                            i: { fontStyle: "italic" },
                            u: { textDecorationLine: "underline" },
                            blockquote: {
                                marginVertical: 10,
                                padding: 10,
                                borderLeftWidth: 4,
                                borderLeftColor: "#ccc",
                                backgroundColor: "#eee"
                            },
                        }}
                    />
                </View>
            </View>
        );
    }

    return content;
};

export default Blog;

const styles = StyleSheet.create({
    blogContainer: {
        flex: 1,
        padding: 20,
        boxSizing: "border-box",
        backgroundColor: "#fff",
    },
    container: {
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontFamily: "RalewayBold",
        marginBottom: 15,
        color: "#4703d1",
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginVertical: 10,
    },
    content: {
        lineHeight: 25,
        fontFamily: "Poppins",
    },
    date: {
        fontFamily: "Poppins",
    },
});
