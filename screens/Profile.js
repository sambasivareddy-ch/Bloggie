import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';

import { AuthContext } from '../context/authContext';
import AppButton from '../components/AppButton';

const Profile = () => {
    const {authState, logout} = useContext(AuthContext)

    const pressHandler = () => {
        logout()
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.profile}>
                {/* <Text style={styles.email}>UID: {authState.uid}</Text> */}
                <Text style={styles.email}>Email: {authState.email}</Text>
                <AppButton text={"Logout"} onPress={pressHandler} withBorder={true}/>
            </View>
        </View>
    )
}   

export default Profile;

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    email: {
        fontSize: 16,
        fontFamily: 'Poppins'
    }
})