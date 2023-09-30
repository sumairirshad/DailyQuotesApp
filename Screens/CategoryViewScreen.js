import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../Components/AppHeader'
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import QuoteContainer from '../Components/QuoteContainer';

const CategoryViewScreen = () => {

    const route = useRoute();
    const { header } = route.params;

    const arrayOfQuotes = [
        { title: "Attitude", quote: "My attitude is based on how you treat me." },
        { title: "Friendship", quote: "A friend is someone who gives freedom to be yourself." },
        { title: "Love", quote: "Love me for a second and I will love you forever." },
        { title: "Atitude", quote: "Love me for a second and I will love you forever." },
    ]

    const renderQuotes = ({ item }) => {
        return (
            <QuoteContainer style={{ marginVertical: 10 }} quote={item.quote} />
        )
    }

    return (
        <View style={styles.container} >
            <AppHeader routeName={header} />
            <View style={styles.body}>
                <FlatList data={arrayOfQuotes} renderItem={renderQuotes} showsVerticalScrollIndicator={false} />
            </View>
        </View>
    )
}

export default CategoryViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        height: '98%',
        paddingHorizontal: 15,
        paddingBottom: 80,
    },
})