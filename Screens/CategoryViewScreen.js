import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../Components/AppHeader'
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import QuoteContainer from '../Components/QuoteContainer';
import { getQuotesByCategoryId } from '../Services/QuotesServices';
import { ActivityIndicator } from 'react-native-paper';
import { startRefreshing, stopRefreshing } from '../Stores/RefreshSlice/refreshSlice';
import { useDispatch } from 'react-redux'

const CategoryViewScreen = () => {

    const [quotes, setQuotes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const route = useRoute();
    const { header, categoryId } = route.params;

    const dispatch = useDispatch();

    const fetchQuotes = async () => {
        const res = await getQuotesByCategoryId(categoryId);
        setQuotes(res);
    }

    useEffect(() => {
        setQuotes([]);
        fetchQuotes();
    }, [categoryId])

    const renderQuotes = ({ item }) => {
        return (
            <QuoteContainer style={{ marginVertical: 10 }} quote={item} />
        )
    }

    const onRefresh = async () => {
        dispatch(startRefreshing())
        setRefreshing(true);
        try {
            // Fetch the latest quotes here
            await fetchQuotes();
        } catch (error) {
            console.error('Error refreshing quotes:', error);
        } finally {
            dispatch(stopRefreshing());
            setRefreshing(false);
        }
    };


    return (
        <View style={styles.container} >
            <AppHeader routeName={header} />
            {quotes.length > 0 ? (<View style={styles.body}>
                <FlatList data={quotes} renderItem={renderQuotes} showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        tintColor={"#0d0d0d"}
                        colors={["#0d0d0d"]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                />
            </View>) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }} >
                    <ActivityIndicator color='black' size={'large'} />
                </View>
            )}
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