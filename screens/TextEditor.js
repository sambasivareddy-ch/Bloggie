import React, { useRef, useState, useLayoutEffect, useContext } from "react";
import {
    TextInput,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";

import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";

import { AuthContext } from "../context/authContext";
import { DraftsContext } from "../context/draftsContext";
import { ThemeContext } from "../context/themeContext";
import { postBlogToFirebase, updateBlogToFirebase } from "../utils/request";
import AppButton from "../components/AppButton";

const TextEditor = (props) => {
    const params = props.route.params;
    const { authState } = useContext(AuthContext);
    const { saveDraft, deleteDraft } = useContext(DraftsContext);
    const { darkMode } = useContext(ThemeContext);

    const richText = useRef();
    const [title, setTitle] = useState(params ? params.blogTitle : "");
    const [tags, setTags] = useState(params ? params.blogTags : []);
    const [tagInput, setTagInput] = useState("");

    const saveDraftButtonHandler = async () => {
        const content = await richText.current.getContentHtml();

        const result = saveDraft({
            title: title,
            tags: tags,
            content: content,
            id: params?.docId,
            draftId: params?.draftId,
        });

        if (result) {
            props.navigation.navigate("Main");
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
        }
        setTagInput("");
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: params ? "Edit Blog" : "New Blog",
        });
    }, [params]);

    const submitHandler = async () => {
        if (!richText || !title) {
            Alert.alert("Inputs", "Please add title & content");
        }

        const content = await richText.current.getContentHtml();

        if (!params) {
            await postBlogToFirebase(
                {
                    userId: authState.uid,
                    title: title,
                    tags: tags,
                    date: Date.now(),
                    content: content,
                },
                authState.authToken
            )
                .then(() => {
                    props.navigation.navigate("Main");
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (params && params.docId) {
            await updateBlogToFirebase(
                {
                    userId: authState.uid,
                    title: title,
                    tags: tags,
                    date: Date.now(),
                    content: content,
                    id: params.docId,
                },
                authState.authToken
            )
                .then(() => {
                    deleteDraft(params?.draftId);
                })
                .then(() => {
                    props.navigation.navigate("Main");
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (params && !params.docId) {
            await postBlogToFirebase(
                {
                    userId: authState.uid,
                    title: title,
                    tags: tags,
                    date: Date.now(),
                    content: content,
                },
                authState.authToken
            )
                .then(() => {
                    deleteDraft(params?.draftId);
                })
                .then(() => {
                    props.navigation.navigate("Main");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            style={[styles.container, darkMode && { backgroundColor: "#000" }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.editorWrapper}>
                    {/* Editable Title Input */}
                    <TextInput
                        style={[
                            styles.titleInput,
                            darkMode && { color: "#fff" },
                        ]}
                        placeholder="Title Here..."
                        value={title}
                        onChangeText={setTitle}
                    />

                    {/* Static timestamp (can be dynamic too) */}
                    <Text style={styles.subheading}>
                        creating at {new Date().toLocaleString()}
                    </Text>

                    {/* Tags Input */}
                    <View style={styles.tagContainer}>
                        <FlatList
                            data={tags}
                            horizontal
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => removeTag(item)}
                                    style={[
                                        styles.tag,
                                        darkMode && { backgroundColor: "#fff" },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            darkMode && { color: "#000" },
                                        ]}
                                    >
                                        {item} ✕
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TextInput
                            style={[
                                styles.tagInput,
                                darkMode && { color: "#fff" },
                            ]}
                            placeholder="Add tag and press enter"
                            value={tagInput}
                            onChangeText={setTagInput}
                            onSubmitEditing={addTag}
                        />
                    </View>

                    {/* Formatting Toolbar */}
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.table,
                            actions.code,
                            actions.blockquote,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                        ]}
                        iconTint={"#000"}
                        selectedIconTint="#6200EE"
                        selectedButtonStyle={{ backgroundColor: "#f2f2f2" }}
                        style={styles.richToolbar}
                    />

                    {/* Rich Text Editor */}
                    <RichEditor
                        ref={richText}
                        placeholder="Blog content here"
                        style={styles.richEditor}
                        initialHeight={400}
                        initialContentHTML={[params?.content || ""]}
                        editorStyle={{
                            backgroundColor: darkMode ? "#000" : "#fff",
                            color: darkMode ? "#fff" : "#000",
                        }}
                    />

                    <View style={styles.editorButtons}>
                        <AppButton
                            text={params ? "Update" : "Save"}
                            withBorder={true}
                            onPress={submitHandler}
                            propStyles={styles.submitButton}
                        />
                        <AppButton
                            text={"Save Draft"}
                            withBorder={true}
                            onPress={saveDraftButtonHandler}
                            propStyles={styles.draftButton}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    editorWrapper: {
        flex: 1,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        paddingVertical: 4,
        fontFamily: "RalewayBold",
    },
    subheading: {
        fontSize: 12,
        color: "#555",
        // marginBottom: 16,
        fontFamily: "Poppins",
    },
    richEditor: {
        paddingVertical: 8,
        minHeight: 200,
        fontFamily: "Poppins",
        height: 400,
    },
    richToolbar: {
        marginTop: 12,
        fontFamily: "Poppins",
        backgroundColor: "#fff",
    },
    tagContainer: {
        flexDirection: "column",
        marginVertical: 12,
    },
    tagInput: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 20,
        fontSize: 14,
        marginTop: 4,
    },
    tag: {
        backgroundColor: "#000",
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    tagText: {
        fontSize: 12,
        color: "#fff",
    },
    editorButtons: {
        position: "absolute",
        bottom: 20,
        left: 0,
        flexDirection: "row",
        gap: 5,
    },
    submitButton: {
        width: 150,
    },
    draftButton: {
        width: 150,
        backgroundColor: "#03a9f4",
    },
});

export default TextEditor;
