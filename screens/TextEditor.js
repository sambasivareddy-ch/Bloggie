import React, { useRef, useState } from "react";
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
} from "react-native";

import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";

import AppButton from "../components/AppButton";

const TextEditor = () => {
    const richText = useRef();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
        }
        setTagInput("");
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    {/* Editable Title Input */}
                    <TextInput
                        style={styles.titleInput}
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
                                    style={styles.tag}
                                >
                                    <Text style={styles.tagText}>{item} ✕</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TextInput
                            style={styles.tagInput}
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
                            actions.checkboxList,
                            actions.table,
                            actions.code,
                            actions.blockquote,
                        ]}
                        iconTint="#fff"
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
                    />
                    <AppButton
                        text={"Save"}
                        withBorder={true}
                        onPress={() => {}}
                    />
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
    titleInput: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        paddingVertical: 4,
        fontFamily: "Poppins",
    },
    subheading: {
        fontSize: 12,
        color: "#555",
        marginBottom: 16,
        fontFamily: "Poppins",
    },
    richEditor: {
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        minHeight: 200,
        fontFamily: "Poppins",
    },
    richToolbar: {
        marginTop: 12,
        borderTopWidth: 1,
        borderColor: "#ddd",
        fontFamily: "Poppins",
        backgroundColor: "#000",
    },
    tagContainer: {
        flexDirection: "column",
        marginBottom: 12,
    },
    tagInput: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 10,
        fontSize: 14,
        marginTop: 4,
    },
    tag: {
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    tagText: {
        fontSize: 12,
        color: "#333",
    },
});

export default TextEditor;
