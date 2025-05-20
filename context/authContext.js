import { createContext, useState } from "react";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    authState: {
        isLoggedIn: false,
        authToken: '',
        uid: '',
        email: '',
        loggedInTime: 0,
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
        loggedInTime: -1,
    });

    useEffect(() => {
        const loadAuthInfo = async () => {
          try {
            const authInfo = await AsyncStorage.getItem('authInfo');
            const parsedData = JSON.parse(authInfo);
            const currentTime = Date.now()
            if (parsedData) {
                if (currentTime - parsedData.loggedInTime <= 60 * 60 * 1000)
                    login(parsedData.token, parsedData.email, parsedData.uid);
                else 
                    logout()
            }
          } catch (e) {
            console.error('Failed to load auth info.', e);
          }
        };
    
        loadAuthInfo();
    }, []);
    

    const login = async (token, email, uid) => {
        const loggedInTime = Date.now();

        setTimeout(() => {
            logout()
        }, 60*60*1000)

        setAuthState({
            isLoggedIn: true,
            authToken: token,
            email: email,
            uid: uid,
            loggedInTime: loggedInTime
        })
        try {
            await AsyncStorage.setItem('authInfo', JSON.stringify({
                token,
                email,
                uid,
                loggedInTime
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
            uid: '',
            loggedInTime: -1,
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
