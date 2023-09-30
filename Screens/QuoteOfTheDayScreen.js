import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../Components/AppHeader'
import QuoteContainer from '../Components/QuoteContainer'

const QuoteOfTheDayScreen = () => {
    return (
        <View style={styles.container} >
            <AppHeader />
            <View style={{ height: 400, marginVertical: 10, paddingHorizontal: 10 }} >
                <QuoteContainer title={"Quote of the day"} quote={'Life is like a coin, you can spend it anyway you want but you can only spend it once.'} />
            </View>
        </View>
    )
}

export default QuoteOfTheDayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})