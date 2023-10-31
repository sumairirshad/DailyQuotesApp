import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppHeader from '../Components/AppHeader'
import QuoteContainer from '../Components/QuoteContainer'
import { getQOTD } from '../Services/QuotesServices'
import { ActivityIndicator } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { RefreshControl } from 'react-native'
import { UserContext } from '../Contexts/UserContext'
import { useNavigation } from '@react-navigation/native'

const QuoteOfTheDayScreen = () => {

    const [quote, setQuote] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const { user } = useContext(UserContext);

    const navigation = useNavigation();

    const getQuoteForToday = async () => {
        if (user) {
            const temp = await getQOTD();
            setQuote(temp);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        // Perform your data fetching or refreshing logic here
        getQuoteForToday();
        setTimeout(() => {
            // Simulate data fetching delay
            setRefreshing(false);
        }, 2000); // Set the timeout duration as needed
    };

    useEffect(() => {
        getQuoteForToday();
    }, [user])


    return (
        <View style={styles.container} >
            <AppHeader />

            {user && <View>
                {quote ? (<ScrollView style={{ height: 'auto', marginVertical: 10, paddingHorizontal: 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                    <QuoteContainer title={"Quote of the day"} quote={quote} />
                </ScrollView>) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }} >
                        <ActivityIndicator color='black' size={'large'} />
                    </View>
                )}
            </View>}
            {!user &&
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>Login to see the Quote of the day!</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')} style={styles.warningButtonContainer}>
                        <Text style={styles.warningButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

export default QuoteOfTheDayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    warningContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        // borderWidth: 1
    },
    warningButtonContainer: {
        flexDirection: 'row',
        backgroundColor: '#0d0d0d',
        width: '40%',
        margin: 15,
        paddingVertical: 16,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningButtonText: {
        color: 'white',
    }
})