import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
    darkMode: false,
    enableDarkMode: () => {},
    disbaleDarkMode: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const storeLocally = async (theme) => {
        try {
            await AsyncStorage.setItem(
                "theme",
                JSON.stringify({
                    theme,
                })
            );
        } catch (err) {
            console.error("error occurred setting the theme");
        }
    };

    useEffect(() => {
        const loadThemeInfo = async () => {
            try {
                const themeInfo = await AsyncStorage.getItem("theme");
                const parsedData = JSON.parse(themeInfo);
                if (parsedData) {
                    if (parsedData.theme) enableDarkMode();
                    else disbaleDarkMode();
                }
            } catch (e) {
                console.error("Failed to load theme info.", e);
            }
        };

        loadThemeInfo();
    }, []);

    const enableDarkMode = async () => {
        setDarkMode(true);
        storeLocally(true);
    };

    const disbaleDarkMode = async () => {
        setDarkMode(false);
        storeLocally(false);
    };

    const value = {
        darkMode,
        enableDarkMode,
        disbaleDarkMode,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
