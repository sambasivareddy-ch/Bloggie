import { View, Text, StyleSheet, TextInput } from 'react-native';

import AppButton from '../components/AppButton';

const Home = ({navigation}) => {
    const buttonPressHandler = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.homeContainer}>
            <View style={styles.container}>
                <Text style={styles.appName}>Bloggie</Text>
                <View style={styles.motto}>
                    <Text style={styles.mottoText}>Your Stories.</Text>
                    <Text style={styles.mottoText}>Your Thoughts.</Text>
                    <Text style={styles.mottoText}>Your Space</Text>
                </View>
                <AppButton text={"Start Writing"} onPress={buttonPressHandler} withBorder={true}/>
            </View>
        </View>
    )
}   

export default Home;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    container: {
        gap: 20,
    },
    appName: {
        fontFamily: 'Raleway',
        fontSize: 64,
    },
    motto: {
        flexDirection: 'row',
        gap: 10,
    },
    mottoText: {
        fontSize: 16,
        fontFamily: 'Poppins',
    }
})