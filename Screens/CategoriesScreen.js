import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import CategoriesContainer from '../Components/CategoriesContainer';
import AppHeader from '../Components/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../Stores/CategorySlice/categorySlice';

const CategoriesScreen = () => {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [tempCategoryArray, setTempCategoryArray] = useState([
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
  ]);

  const onChangeSearch = query => {
    setSearchQuery(query);
  }

  const filteredData = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRandomColors = () => {
    const colors = [
      'red', 'green', 'blue', 'yellow', 'tomato', 'purple', 'orange', 'pink', 'gray',
      'lime', 'black', 'navy', 'seagreen', 'silver', 'cyan', 'magenta', 'violet',
      'indigo', 'gold', 'brown', 'tan', 'olive', 'maroon', 'coral', 'teal', 'aquamarine', 'orchid', 'slateblue'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  const renderCategories = ({ item, index }, length) => {
    return (
      <View style={{ width: (length === 1 ? '100%' : '50%'), paddingHorizontal: 5 }} >
        <CategoriesContainer id={item.categoryId} categoryText={item.name} color={getRandomColors()} />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container} >
        <AppHeader />
        {categories.length > 0 ? (
          <>
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

            <View style={{ marginTop: 20, flex: 1 }}>
              {filteredData.length > 0 ? (<FlatList showsVerticalScrollIndicator={false} data={filteredData} numColumns={2} contentContainerStyle={{ alignSelf: 'center' }} style={styles.listContainer} renderItem={(item) => renderCategories(item, filteredData.length)} />) :
                (<Text>No Category to show</Text>)}
            </View>
          </>)
          : (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }} >
              <ActivityIndicator color='black' size={'large'} />
            </View>
          )}

      </View>
    </>
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