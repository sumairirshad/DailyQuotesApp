import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { auth } from '../Firebase'
import QuoteContainer from '../Components/QuoteContainer'

const HomeScreen = () => {

  const arrayOfQuotes = [
    { title: "Attitude", quote: "My attitude is based on how you treat me." },
    { title: "Friendship", quote: "A friend is someone who gives freedom to be yourself." },
    { title: "Love", quote: "Love me for a second and I will love you forever." },
    { title: "Atitude", quote: "Love me for a second and I will love you forever." },
  ]

  const renderQuotes = ({ item }) => {
    return (
      <QuoteContainer style={{marginVertical: 10}} quote={item.quote} />
    )
  }

  return (
    <View style={styles.container} >
      {/* <QuoteContainer title={"Quote of the day"} quote={'Life is like a coin, you can spend it anyway you want but you can only spend it once.'} /> */}
      <FlatList data={arrayOfQuotes} renderItem={renderQuotes} showsVerticalScrollIndicator={false} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  }
})