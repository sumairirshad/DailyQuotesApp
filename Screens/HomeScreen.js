import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase'
import QuoteContainer from '../Components/QuoteContainer'
import AppHeader from '../Components/AppHeader'
import { RefreshControl } from 'react-native'

const HomeScreen = () => {

  const [refreshing, setRefreshing] = useState(false);

  const arrayOfQuotes = [
    { title: "Attitude", quote: "My attitude is based on how you treat me." },
    { title: "Friendship", quote: "A friend is someone who gives freedom to be yourself." },
    { title: "Love", quote: "Love me for a second and I will love you forever." },
    { title: "Atitude", quote: "Love me for a second and I will love you forever." },
    { title: "Atitude", quote: "Love me for a second and I will love you forever." },
    { title: "Atitude", quote: "Love me for a second and I will love you forever." },
  ]

  const renderQuotes = ({ item, index }) => {
    if (index === 0) {
      return (
        <QuoteContainer title={"Quote of the day"} quote={'Life is like a coin, you can spend it anyway you want but you can only spend it once.'} />
      )
    }
    else {
      return (
        <QuoteContainer style={{ marginVertical: 10 }} quote={item.quote} />
      )
    }
  }

  return (
    <View style={styles.container} >
      <AppHeader />
      <View style={styles.body}>
        {/* <View style={{ height: 400, marginVertical: 10 }} >
          <QuoteContainer title={"Quote of the day"} quote={'Life is like a coin, you can spend it anyway you want but you can only spend it once.'} />
        </View> */}
        <FlatList
          data={arrayOfQuotes}
          renderItem={renderQuotes}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl
            tintColor={"#db3760"}
            colors={["#db3760"]}
            refreshing={refreshing}
          // onRefresh={onRefresh}
          />}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '95%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 60,
  },
})