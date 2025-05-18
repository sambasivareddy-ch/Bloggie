import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "./screens/Home";
import Feed from "./screens/Feed";
import Blog from "./screens/Blog";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import TextEditor from "./screens/TextEditor";
import CreateAccount from "./screens/CreateAccount";

import { AuthProvider, AuthContext } from "./context/authContext";

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
    return (
        <TabNavigator.Navigator>
            <TabNavigator.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="book-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarActiveTintColor: "#673ab7",
                    title: "Your Blogs",
                    tabBarLabelPosition: "beside-icon",
                }}
            />
            <TabNavigator.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />
                    ),
                    title: "Profile",
                    tabBarActiveTintColor: '#673ab7',
                    tabBarLabelPosition: "beside-icon",
                }}
            />
        </TabNavigator.Navigator>
    );
};

const MainAppNav = () => {
  return (
      <StackNavigator.Navigator screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
      }}>
          <StackNavigator.Screen
              name="Main"
              component={TabsNav}
              options={{ headerShown: false }}
          />
          <StackNavigator.Screen name="Blog" component={Blog} />
          <StackNavigator.Screen
              name="Editor"
              component={TextEditor}
          />
      </StackNavigator.Navigator>
  );
};

const StackNav = () => {
    return (
        <StackNavigator.Navigator screenOptions={{
          headerBackButtonDisplayMode: 'minimal'
        }}>
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
        </StackNavigator.Navigator>
    );
};

const AppNavigation = () => {
    const { authState } = useContext(AuthContext);

    let mainNav = <StackNav />;
    if (authState.isLoggedIn) {
        mainNav = <MainAppNav />;
    }

    return mainNav;
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
        <AuthProvider>
            {/* <SafeAreaView style={styles.container}> */}
            <NavigationContainer>
                <StatusBar style="dark" />
                <View style={styles.container}>
                    <AppNavigation />
                </View>
            </NavigationContainer>
            {/* </SafeAreaView> */}
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
