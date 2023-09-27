import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

const NavigationManager = () => {

    const auth = useContext(UserContext)
    const user = auth.user;

    if (user == null) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (user === false) {
        return (
            <AuthNavigator />
        )
    }
    else {
        return (
            <RootNavigator />
        )
    }
}

export default NavigationManager
