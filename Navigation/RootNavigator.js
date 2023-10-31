import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import DrawerComponent from '../Components/DrawerComponent';
import CategoryViewScreen from '../Screens/CategoryViewScreen';
import QuoteOfTheDayScreen from '../Screens/QuoteOfTheDayScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import LikedQuotes from '../Screens/LikedQuotes';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerComponent {...props} />}
            screenOptions={{
                drawerType: 'slide',
                swipeEdgeWidth: 140,
                headerShown: false,
                keyboardDismissMode: 'on-drag'
            }}
            backBehavior='history'
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} options={{ swipeEnabled: false }} />
            <Drawer.Screen name="Register" component={SignupScreen} options={{ swipeEnabled: false }} />
            <Drawer.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{ swipeEnabled: false }} />
            <Drawer.Screen name="Categories" component={CategoriesScreen} />
            <Drawer.Screen name="Liked Quotes" component={LikedQuotes} />
            <Drawer.Screen name="CategoryView" component={CategoryViewScreen} />
            <Drawer.Screen name="Quote of the Day" component={QuoteOfTheDayScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}

export default RootNavigator;