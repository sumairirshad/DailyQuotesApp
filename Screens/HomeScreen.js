import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { auth } from '../Firebase'

const HomeScreen = () => {

    const handleLogout = async () => {
        await auth.signOut();
    }

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button mode='elevated' style={{width: '40%'}} onPress={() => handleLogout()}>Logout</Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})