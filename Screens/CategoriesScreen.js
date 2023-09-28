import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
import CategoriesContainer from '../Components/CategoriesContainer';

const CategoriesScreen = () => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const categoryArray = [
    { name: 'Alone', color: 'red' },
    { name: 'Angry', color: 'green' },
    { name: 'Anniversary', color: 'pink' },
    { name: 'Attitude', color: 'blue' },
    { name: 'Awesome', color: 'grey' },
    { name: 'Awkward Moment', color: 'yellow' },
    { name: 'Beard', color: 'orange' },
    { name: 'Beautiful', color: 'purple' },
    { name: 'Best', color: 'tomato' },
    { name: 'Bike', color: 'pink' },
    { name: 'Attitude', color: 'blue' },
    { name: 'Awesome', color: 'grey' },
  ]

  const renderCategories = ({ item }) => {
    return (
      <View style={{width: 165, paddingHorizontal: 5}} >
        <CategoriesContainer categoryText={item.name} color={item.color} />
      </View>
    )
  }

  return (
    <View style={styles.container} >

      <View style={styles.searchBarContainer}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search..."
          iconColor='#333'
          selectionColor={'lightgrey'}
          cursorColor={'#0d0d0d'}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

    <View style={{marginTop: 20, flex: 1}}>

      <FlatList showsVerticalScrollIndicator={false} data={categoryArray} numColumns={2} contentContainerStyle={{alignSelf: 'center'}} style={styles.listContainer} renderItem={renderCategories} />
    </View>

    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchBarContainer: {
  },
  searchBar: {
    backgroundColor: '#eee',
    fontSize: 10,
  },
  listContainer: {
    
  },
})