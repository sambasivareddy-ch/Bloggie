import { View, Text, StyleSheet } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

const Tag = ({text}) => {
    return <View style={styles.tag}>
        <EvilIcons name="tag" size={16} color={'white'}/>
        <Text style={styles.tagText}>{text}</Text>
    </View>
}

export default Tag;

const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#000',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
        textTransform: 'capitalize'
    }
})