import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, NativeModules } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
const { StatusBarManager } = NativeModules;
import React from 'react'

const AppHeader = ({ routeName }) => {

    const navigation = useNavigation()
    const route = useRoute();

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar style='light' backgroundColor='#333' />
            <View
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'between',
                    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT + 12 : 0,
                    paddingBottom: 12
                }}
            >
                {(route.name === "Home" || route.name === 'Categories' || route.name === 'Profile') ?
                    (<TouchableOpacity style={{ paddingHorizontal: '5%' }} onPress={() => navigation.toggleDrawer()}>
                        <Ionicons name="menu-outline" size={30} color="#000" />
                    </TouchableOpacity>) :
                    (<TouchableOpacity style={{ paddingHorizontal: '5%' }} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={30} color="#000" />
                    </TouchableOpacity>)}
                <View style={{ paddingHorizontal: 5 }} >
                    <Text style={styles.appHeaderText} >{routeName ? routeName : route.name}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        zIndex: 4,
    },
    appHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        // fontFamily: 'Colab-Regular',
    }
})