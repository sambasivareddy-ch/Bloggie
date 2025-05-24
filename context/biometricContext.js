import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BiometricContext = createContext({
    enabled: false,
    enableBiometric: () => {},
    disableBiometric: () => {},
});

export const BiometricProvider = ({ children }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const loadBioInfo = async () => {
            try {
                const bioInfo = await AsyncStorage.getItem("biometric");
                const parsedData = JSON.parse(bioInfo);
                if (parsedData) {
                    if (parsedData.enabled) enableBiometric();
                    else disableBiometric();
                }
            } catch (e) {
                console.error("Failed to load auth info.", e);
            }
        };

        loadBioInfo();
    }, []);

    const enableBiometric = async () => {
        try {
            await AsyncStorage.setItem(
                "biometric",
                JSON.stringify({
                    enabled: true,
                })
            );
        } catch (err) {
            console.error("error occurred setting biometric info");
        }
        setEnabled(true);
    };

    const disableBiometric = async () => {
        try {
            await AsyncStorage.removeItem("biometric");
        } catch (err) {
            console.error("error occurred deleting auth info");
        }
        setEnabled(false);
    };

    const value = {
        enabled,
        enableBiometric,
        disableBiometric,
    };

    return <BiometricContext value={value}>{children}</BiometricContext>;
};
