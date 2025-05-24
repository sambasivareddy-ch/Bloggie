import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext } from "react";

import FeedCard from "../components/FeedCard";
import { DraftsContext } from "../context/draftsContext";
import { ThemeContext } from "../context/themeContext";
import { lightThemeColor, darkThemeColor } from "../utils/themeColors";

const Drafts = ({ navigation }) => {
    const { drafts } = useContext(DraftsContext);
    const { darkMode } = useContext(ThemeContext);

    const openEditorHandler = (draft) => {
        navigation.navigate("Editor", {
            content: draft.content,
            blogTitle: draft.title,
            blogTags: draft.tags,
            draftId: draft.draftId,
            docId: draft.id,
        });
    };

    const themeBasedColors = darkMode ? darkThemeColor : lightThemeColor;

    return (
        <View style={[styles.container, themeBasedColors]}>
            <View style={styles.drafts}>
                <Text style={[styles.title, darkMode && { color: "#fff" }]}>
                    Your Drafts
                </Text>
                {drafts && drafts.length > 0 && (
                    <View>
                        <FlatList
                            data={drafts.sort((a, b) => b.date - a.date)}
                            keyExtractor={() => Math.random().toString()}
                            renderItem={({ item }) => (
                                <FeedCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    tags={item.tags}
                                    date={item.date}
                                    onPress={() => {
                                        openEditorHandler(item);
                                    }}
                                    tagPressHandler={() => {}}
                                />
                            )}
                        />
                    </View>
                )}
                {drafts && drafts.length === 0 && (
                    <Text style={darkMode && { color: "#fff" }}>
                        You don't have any drafts yet. Start writing something!
                    </Text>
                )}
            </View>
        </View>
    );
};

export default Drafts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    drafts: {
        padding: 20,
        width: "100%",
    },
    title: {
        fontFamily: "Raleway",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 15,
    },
});
