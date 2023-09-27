import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';

const Auth = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                gestureEnabled: false, // Disable gesture to open the drawer
                edgeWidth: 0, // Disable swipe gesture on the edge to open the drawer
            }}
        >
            <Auth.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Auth.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Auth.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        </Auth.Navigator>
    )
}

export default AuthNavigator

