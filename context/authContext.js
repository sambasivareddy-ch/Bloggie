import { createContext, useState } from "react";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    authState: {
        isLoggedIn: false,
        authToken: '',
        uid: '',
        email: ''
    },
    login: (token, email, uid) => {},
    logout: () => {}
})

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        authToken: '',
        email: '',
        uid: '',
    });

    useEffect(() => {
        const loadAuthInfo = async () => {
          try {
            const authInfo = await AsyncStorage.getItem('authInfo');
            const parsedData = JSON.parse(authInfo);
            if (parsedData) {
              login(parsedData.token, parsedData.email, parsedData.uid);
            }
          } catch (e) {
            console.error('Failed to load auth info.', e);
          }
        };
    
        loadAuthInfo();
    }, []);
    

    const login = async (token, email, uid) => {
        setAuthState({
            isLoggedIn: true,
            authToken: token,
            email: email,
            uid: uid
        })
        try {
            await AsyncStorage.setItem('authInfo', JSON.stringify({
                token,
                email,
                uid,
            }));
        } catch(err) {
            console.error('error occurred loading auth info')
        }
    }

    const logout = async () => {
        setAuthState({
            isLoggedIn: false,
            authToken: '',
            email: '',
            uid: ''
        })
        try {
            await AsyncStorage.removeItem('authInfo')
        } catch(err) {
            console.error('error occurred deleting auth info')
        }
    }

    const value = {
        authState,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}