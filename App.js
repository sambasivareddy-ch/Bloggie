import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "./screens/Home";
import Feed from "./screens/Feed";
import Blog from "./screens/Blog";
import Login from "./screens/Login";
import Drafts from "./screens/Drafts";
import Profile from "./screens/Profile";
import TextEditor from "./screens/TextEditor";
import CreateAccount from "./screens/CreateAccount";
import {
    ChangeEmail,
    ChangePassword,
    ResetPasswordWithEmail,
} from "./screens/ChangeCredential";

import { AuthProvider, AuthContext } from "./context/authContext";
import {
    BiometricContext,
    BiometricProvider,
} from "./context/biometricContext";
import { DraftsProvider } from "./context/draftsContext";
import { ThemeContext, ThemeProvider } from "./context/themeContext";

const fetchFonts = () => {
    return Font.loadAsync({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
        RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    });
};

const StackNavigator = createNativeStackNavigator();
const TabNavigator = createBottomTabNavigator();

const TabsNav = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <TabNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: darkMode ? "#000" : "#fff",
                    borderBottomWidth: darkMode ? 1 : 0,
                    borderBottomColor: darkMode ? "#fff" : "#000",
                },
                tabBarStyle: {
                    backgroundColor: darkMode ? "#000" : "#fff",
                },
                headerTintColor: darkMode ? "#fff" : "#000",
            }}
        >
            <TabNavigator.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="library-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarActiveTintColor: "#673ab7",
                    title: "Feed",
                    tabBarLabelPosition: "beside-icon",
                }}
            />
            <TabNavigator.Screen
                name="Drafts"
                component={Drafts}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="albums-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarActiveTintColor: "#673ab7",
                    title: "Drafts",
                    tabBarLabelPosition: "beside-icon",
                }}
            />
            <TabNavigator.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    title: "Profile",
                    tabBarActiveTintColor: "#673ab7",
                    tabBarLabelPosition: "beside-icon",
                }}
            />
        </TabNavigator.Navigator>
    );
};

const MainAppNav = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: darkMode ? "#000" : "#fff",
                    borderBottomWidth: darkMode ? 1 : 0,
                    borderBottomColor: darkMode ? "#fff" : "#000",
                },
                headerTintColor: darkMode ? "#fff" : "#000",
                headerBackButtonDisplayMode: "minimal",
            }}
        >
            <StackNavigator.Screen
                name="Main"
                component={TabsNav}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen name="Blog" component={Blog} />
            <StackNavigator.Screen name="Editor" component={TextEditor} />
            <StackNavigator.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    title: "Change Password",
                }}
            />
            <StackNavigator.Screen
                name="ChangeEmail"
                component={ChangeEmail}
                options={{
                    title: "Change Email",
                }}
            />
        </StackNavigator.Navigator>
    );
};

const StackNav = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerBackButtonDisplayMode: "minimal",
                headerStyle: {
                    backgroundColor: darkMode ? "#000" : "#fff",
                    borderBottomWidth: darkMode ? 1 : 0,
                    borderBottomColor: darkMode ? "#fff" : "#000",
                },
                headerTintColor: darkMode ? "#fff" : "#000",
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={Home}
                options={{ title: "Home" }}
            />
            <StackNavigator.Screen
                name="SignUp"
                component={CreateAccount}
                options={{ title: "Create Account" }}
            />
            <StackNavigator.Screen
                name="Login"
                component={Login}
                options={{ title: "Login" }}
            />
            <StackNavigator.Screen
                name="ResetPassword"
                component={ResetPasswordWithEmail}
                options={{
                    title: "Reset Password",
                }}
            />
        </StackNavigator.Navigator>
    );
};

const AppNavigation = () => {
    const { authState } = useContext(AuthContext);
    const { enabled } = useContext(BiometricContext);

    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const authenticate = async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (!compatible || !enrolled) {
                Alert.alert(
                    "Biometrics not available",
                    "Device has no biometrics"
                );
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate to access app",
                fallbackLabel: "Enter passcode",
            });

            setAuthenticated(result.success);
        };

        if (enabled) authenticate();
    }, [enabled]);

    if (enabled && !authenticated) {
        return null;
    }

    let mainNav = <StackNav />;
    if (authState.isLoggedIn) {
        mainNav = (
            <DraftsProvider>
                <MainAppNav />
            </DraftsProvider>
        );
    }

    return mainNav;
};

const MainNavigation = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <StatusBar style={darkMode ? "light" : "dark"} />
            <View style={styles.container}>
                <AppNavigation />
            </View>
        </NavigationContainer>
    );
};

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
        RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <BiometricProvider>
                <AuthProvider>
                    <MainNavigation />
                </AuthProvider>
            </BiometricProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
