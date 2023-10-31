import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import QuoteContainer from '../Components/QuoteContainer'
import AppHeader from '../Components/AppHeader'
import { RefreshControl } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { ActivityIndicator, Button } from 'react-native-paper'
import { getAllQuotes, getQOTD } from '../Services/QuotesServices'
import { UserContext } from '../Contexts/UserContext'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { startRefreshing, stopRefreshing } from '../Stores/RefreshSlice/refreshSlice'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const adUnitIdDev = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdDev, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const HomeScreen = () => {

  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastKey, setLastKey] = useState(null);
  const [IsEnded, setIsEnded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [qotd, setQotd] = useState();

  const dispatch = useDispatch();

  const getQuoteForToday = async () => {
    if (user) {
      const temp = await getQOTD();
      setQotd(temp);
    }
  }

  useEffect(() => {
    getQuoteForToday();
  }, [user])

  const renderQuotes = ({ item, index }) => {
    if (index === 0) {
      if (qotd) {
        return (
          <QuoteContainer title={"Quote of the day"} quote={qotd} />
          // <QuoteContainer title={"Quote of the day"} quote={'Life is like a coin, you can spend it anyway you want but you can only spend it once.'} />
        )
      }
      else {
        return false;
      }
    }
    else if (index === 2) {
      return (
        <>
          {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          /> */}
          <QuoteContainer style={{}} quote={item} />
        </>
      )
    }
    else {
      return (
        <QuoteContainer style={{}} quote={item} />
      )
    }
  }

  const FooterComponent = () => {
    return (
      loading ? (<ActivityIndicator style={{ paddingVertical: 25, }} color='black' size={"small"} />)  // Display loading indicator
        : (
          <View style={{ width: '100%', backgroundColor: '#f4f4f4', height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ color: '#333', fontSize: 12 }}>Nothing to show more</Text>
          </View>
        )
    )
  }

  const loadMoreQuotes = async () => {
    if (!IsEnded) {
      if (loading) return;

      setLoading(true);

      try {
        const newQuotes = await getAllQuotes(lastKey);

        if (newQuotes.length > 0) {
          // Update lastKey with the timestamp of the last quote from the previous batch
          setLastKey(newQuotes[newQuotes.length - 1].timeStamp);

          // Merge the existing quotes with the new quotes and update the state
          const updatedQuotes = [...quotes, ...newQuotes];
          setQuotes(updatedQuotes);
        }

        else setIsEnded(true);

      } finally {
        setLoading(false);
      }
    }
  };

  const backToInitial = () => {
    setLastKey(null);
    setIsEnded(false);
  }

  const onRefresh = async () => {
    backToInitial();
    dispatch(startRefreshing())
    setRefreshing(true);
    try {
      // Fetch the latest quotes here
      const newQuotes = await getAllQuotes(null);
      getQuoteForToday();
      // Update your quotes state with the new data
      if (newQuotes.length > 0) {
        // Update lastKey with the timestamp of the last quote from the previous batch
        setLastKey(newQuotes[newQuotes.length - 1].timeStamp);
        setQuotes(newQuotes);
      }

      else setIsEnded(true);
    } catch (error) {
      console.error('Error refreshing quotes:', error);
    } finally {
      dispatch(stopRefreshing());
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial load of quotes
    loadMoreQuotes();
  }, []);

  return (
    <View style={styles.container} >
      <AppHeader />
      <View style={styles.body}>
        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
        {/* <Button onPress={() => interstitial.show()} >Show ad</Button> */}
        <View style={{ height: '95%', }} >
          <FlatList
            data={quotes}
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
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  body: {
    // paddingVertical: 10,
    // height: '95%',
    width: '95%',
    // paddingBottom: 60,
  },
})