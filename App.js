import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";

import Home from "./screens/Home";
import Feed from "./screens/Feed";
import Login from "./screens/Login";
import TextEditor from "./screens/TextEditor";
import CreateAccount from "./screens/CreateAccount";

const fetchFonts = () => {
    return Font.loadAsync({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
    });
};

const StackNavigator = createNativeStackNavigator();

export default function App() {

    const [fontsLoaded] = Font.useFonts({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <StackNavigator.Navigator>
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
                        name="Feed"
                        component={Feed}
                        options={{ title: "Your Feed" }}
                    />
                    <StackNavigator.Screen
                        name="Editor"
                        component={TextEditor}
                        options={{ title: "New Blog" }}
                    />
                </StackNavigator.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
