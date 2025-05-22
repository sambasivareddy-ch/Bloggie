import { View, Text, StyleSheet, Button } from 'react-native';
import { useContext } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";

import PressableText from '../components/PressableText';
import { AuthContext } from '../context/authContext';
import { deleteAccount } from '../utils/request';

const Profile = ({navigation}) => {
    const {authState, logout} = useContext(AuthContext)

    const pressHandler = () => {
        logout()
    }

    const emailChangeHandler = () => {
        navigation.navigate('ChangeEmail');
    }

    const passwordChangeHandler = () => {
        navigation.navigate('ChangePassword');
    }

    const deleteAccountHandler = async () => {
        try {
            await deleteAccount(authState.authToken);
            logout()
        } catch(err) {
            console.error('Error occurred during deletion of account')
        }
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.profile}>
                <Text style={styles.email}>Email: {authState.email}</Text>
                <Text style={styles.uid}>UID: {authState.uid}</Text>
            </View>
            <View style={styles.profileSettings}>
                <View style={styles.settingHeader}>
                    <Ionicons name="settings-outline" size={28}/>
                    <Text style={styles.setting}>Settings</Text>
                </View>
                <PressableText text='Change Email' color={'#000'} onPress={emailChangeHandler}/>
                <PressableText text='Change Password' color={'#000'} onPress={passwordChangeHandler}/>
                <PressableText text='Logout' color={'#4703d1'} onPress={pressHandler}/>
                <PressableText text='Delete Account' color={'#f44336'} onPress={deleteAccountHandler}/>
            </View>
        </View>
    )
}   

export default Profile;

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profile: {
        flex: 1,
        gap: 15,
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fafafa',
    },
    email: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
    },
    uid: {
        fontFamily: 'Poppins'
    },
    profileSettings: {
        flex: 5,
        alignItems: 'flex-start',
        padding: 20,
        gap: 20,
    },
    settingHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    setting: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
    }
})