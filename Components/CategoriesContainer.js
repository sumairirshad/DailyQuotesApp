import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CategoriesContainer = ({ categoryText, color }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CategoryView', { header: categoryText })} style={styles.container} >
            <View style={[styles.categoryContainer, { backgroundColor: color }]}>
                <Text style={styles.categoryText}>{categoryText}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoriesContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        marginVertical: 5,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 5,
    },
    categoryText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 14,
    }
})