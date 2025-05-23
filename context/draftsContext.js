import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./authContext";

export const DraftsContext = createContext({
    drafts: [],
    saveDraft: async (blog) => true,
    deleteDraft: (title) => {},
});

export const DraftsProvider = ({ children }) => {
    const [drafts, setDrafts] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const loadDrafts = async () => {
            try {
                const savedDrafts = await AsyncStorage.getItem(
                    `drafts_${authState.uid}`
                );
                const parsedData = JSON.parse(savedDrafts);
                if (parsedData) {
                    setDrafts(parsedData["drafts"]);

                    const maxId = parsedData["drafts"]?.reduce(
                        (max, d) => Math.max(max, d.draftId ?? 0),
                        0
                    );
                    setIdCounter(maxId + 1);
                }
            } catch (e) {
                console.error("Failed to load auth info.", e);
            }
        };

        loadDrafts();
    }, []);

    const saveDraft = async (blog) => {
        let idx = -1;
        if (blog.draftId)
            idx = drafts.findIndex((draft) => draft.draftId === blog.draftId);

        let updatedDrafts;
        if (idx === -1) {
            updatedDrafts = [{...blog, draftId: idCounter}, ...drafts];
            setIdCounter(idCounter + 1);
        } else {
            updatedDrafts = [...drafts];
            updatedDrafts[idx] = { ...updatedDrafts[idx], ...blog };
        }

        setDrafts(updatedDrafts);

        try {
            await AsyncStorage.setItem(
                `drafts_${authState.uid}`,
                JSON.stringify({
                    drafts: updatedDrafts,
                })
            );
            return true;
        } catch (err) {
            console.error("error occurred setting drafts info");
            return false;
        }
    };

    const deleteDraft = async (draftId) => {
        try {
            setDrafts((prevDrafts) => {
                const updatedDrafts = prevDrafts.filter((blog) => blog.draftId !== draftId);
    
                // Save to AsyncStorage
                AsyncStorage.setItem(
                    `drafts_${authState.uid}`,
                    JSON.stringify({ drafts: updatedDrafts })
                ).catch((err) => {
                    console.error("Error while saving updated drafts:", err);
                });
    
                return updatedDrafts;
            });
    
            return true;
        } catch (err) {
            console.error("Error while deleting draft:", err);
            return false;
        }
    };

    const value = {
        drafts,
        saveDraft,
        deleteDraft,
    };

    return <DraftsContext value={value}>{children}</DraftsContext>;
};
