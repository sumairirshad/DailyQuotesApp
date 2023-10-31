import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppHeader from '../Components/AppHeader'
import QuoteContainer from '../Components/QuoteContainer'
import { getAllLikedQuotes } from '../Services/QuotesServices'
import { ActivityIndicator } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { RefreshControl } from 'react-native'
import { UserContext } from '../Contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'

const LikedQuotes = () => {

    const [likedQuotes, setLikedQuotes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lastKey, setLastKey] = useState(null);
    const [IsEnded, setIsEnded] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);

    const { user } = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            setIsLoading(true);
            setIsEnded(false);
            loadMoreQuotes();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        loadMoreQuotes();
    }, [user])

    const renderQuotes = ({ item, index }) => {
        return (
            <QuoteContainer quote={item} />
        )
    }

    const FooterComponent = () => {
        return (
            loading ? (<ActivityIndicator style={{ paddingVertical: 25, }} color='black' size={"small"} />)  // Display loading indicator
                : (
                    <View style={{ width: '100%', backgroundColor: '#f4f4f4', height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ color: '#333', fontSize: 12 }}>No more content available!</Text>
                    </View>
                )
        )
    }

    const loadMoreQuotes = async () => {
        if (!IsEnded && user) {
            if (loading) return;

            setLoading(true);

            try {
                const newQuotes = await getAllLikedQuotes(lastKey);

                if (newQuotes.length > 0) {

                    // Merge the existing quotes with the new quotes and update the state
                    const updatedQuotes = [...likedQuotes, ...newQuotes];

                    // Update lastKey with the timestamp of the last quote from the previous batch
                    setLastKey(updatedQuotes.length - 1);

                    setLikedQuotes(updatedQuotes);
                }

                else {
                    if (lastKey === null) {
                        setLikedQuotes([]);
                    }
                    else {
                        setIsEnded(true);
                    }
                }

            } finally {
                setLoading(false);
            }
        }
    };

    const backToInitial = () => {
        setLastKey(null);
        // setIsEnded(false);
    }

    const onRefresh = async () => {
        backToInitial();
        setRefreshing(true);
        try {
            // Fetch the latest quotes here
            const newQuotes = await getAllLikedQuotes(null);
            // Update your quotes state with the new data
            if (newQuotes.length > 0) {
                // Update lastKey with the timestamp of the last quote from the previous batch
                setLastKey(newQuotes.length - 1);
                setLikedQuotes(newQuotes);
            }

            else {
                setLikedQuotes([]);
                setIsEnded(true);
            }
        } catch (error) {
            console.error('Error refreshing quotes:', error);
        } finally {
            setRefreshing(false);
        }
    };


    return (
        <View style={styles.container} >
            <AppHeader />

            {user && <View style={styles.body} >
                {IsLoading ? (
                    <View style={{ height: '95%', }} >
                        <FlatList
                            data={likedQuotes}
                            renderItem={renderQuotes}
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl
                                tintColor={"#0d0d0d"}
                                colors={["#0d0d0d"]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                            onEndReached={loadMoreQuotes} // Trigger loadMoreQuotes when reaching the end
                            onEndReachedThreshold={0.1} // Adjust as needed
                            ListFooterComponent={() => <FooterComponent />}
                        />
                    </View>
                ) : (
                    <>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }} >
                            <ActivityIndicator color='black' size={'large'} />
                        </View>
                    </>
                )}
            </View>}
            {!user &&
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>Login to view your liked quotes!</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')} style={styles.warningButtonContainer}>
                        <Text style={styles.warningButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

export default LikedQuotes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
        width: '95%',
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
        margin: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningButtonText: {
        color: 'white',
        textAlign: 'center',
    }
})