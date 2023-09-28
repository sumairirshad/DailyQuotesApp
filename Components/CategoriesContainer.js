import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoriesContainer = ({categoryText, color}) => {

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} >
            <View style={[styles.categoryContainer, {backgroundColor: color}]}>
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
        // width: '90%',
        padding: 10,
        borderRadius: 5,
    },
    categoryText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 14,
    }
})