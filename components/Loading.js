import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({text}) => {
    return (
        <View style={styles.loadingContainer}>
            <View>
                <ActivityIndicator size={'large'}/>
                <Text style={styles.loadMessage}>{text}</Text>
            </View>
        </View>
    )
}

export default Loading;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadMessage: {
        fontFamily: 'Poppins',
        fontSize: 18,
        marginVertical: 20
    }
})