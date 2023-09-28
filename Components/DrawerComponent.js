import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../Firebase';
import { Divider } from 'react-native-paper';


const DrawerComponent = (props) => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* <StatusBar  /> */}
      <View style={styles.drawerWrapper}>
        <DrawerContentScrollView {...props}
          contentContainerStyle={styles.drawerContent}
        >
          <View style={styles.midPart}>

            <DrawerItem
              label="Home"
              labelStyle={styles.drawerItem}
              icon={() => (
                <View style={styles.iconContainer}>
                  <Ionicons name="home" size={26} color="#FAFAFA" />
                </View>
              )}
              onPress={() => {
                navigation.navigate('Home')
              }}

            />
            <Divider style={{ marginTop: 10, marginBottom: 5, marginLeft: 60, maxWidth: 150 }} />
            <DrawerItem
              label="Profile"
              labelStyle={styles.drawerItem}
              icon={() => (
                <View style={styles.iconContainer}>
                  <Ionicons name="ios-person-circle-outline" size={26} color="#FAFAFA" />
                </View>
              )}
              onPress={() => {
                navigation.navigate('Profile')
              }}

            />
            <Divider style={{ marginTop: 10, marginBottom: 5, marginLeft: 60, maxWidth: 150 }} />
            <DrawerItem
              label="Categories"
              labelStyle={styles.drawerItem}
              icon={() => (
                <View style={styles.iconContainer}>
                  <MaterialIcons name="category" size={26} color="#FAFAFA" />
                </View>
              )}
              onPress={() => {
                navigation.navigate('Categories')
              }}

            />
            <Divider style={{ marginTop: 10, marginBottom: 5, marginLeft: 60, maxWidth: 150 }} />
            <DrawerItem
              label="Quote of the Day"
              labelStyle={styles.drawerItem}
              icon={() => (
                <View style={styles.iconContainer}>
                  <FontAwesome name="quote-left" size={26} color="#FAFAFA" />
                </View>
              )}
              onPress={() => {

              }}

            />
            {/* <Divider style={{ marginTop: 10, marginBottom: 5, marginLeft: 60, maxWidth: 150 }} />
                        <DrawerItem
                            label="Security"
                            labelStyle={styles.drawerItem}
                            icon={() => (
                                <View style={styles.iconContainer}>
                                    <Image style={{ width: 26, height: 26 }} />
                                </View>
                            )}
                            onPress={() => {
                            }}

                        /> */}
          </View>

          <View style={styles.botPart} >
            <DrawerItem
              label=""
              style={{ marginBottom: 40, }}
              labelStyle={styles.drawerItem}
              icon={() => (
                <View style={styles.signOutContainer}>
                  <Text style={styles.drawerItem}>Sign-out</Text>
                  <AntDesign style={{ paddingLeft: 10 }} name="arrowright" size={26} color="#fafafa" />
                </View>
              )}
              onPress={async () => {
                await auth.signOut();
              }}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent'
  },
  drawerWrapper: {
    backgroundColor: '#0d0d0d',
    // borderTopRightRadius: 30, // Adjust as needed
    // borderBottomRightRadius: 30, // Adjust as needed
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Add this line to show shadow on Android
    overflow: 'hidden',
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  midPart: {
  },
  botPart: {
    height: '40%',
    justifyContent: 'flex-end',

  },
  drawerItem: {
    color: '#fff',
    // fontWeight: 700,
  },
  iconContainer: {
    marginRight: -5,
  },
  signOutContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default DrawerComponent;