import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import DrawerComponent from '../Components/DrawerComponent';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerComponent {...props} />}
            screenOptions={{
                drawerType: 'slide',
                swipeEdgeWidth: 140,
            }}
            backBehavior='history'
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Categories" component={CategoriesScreen} />
        </Drawer.Navigator>
    );
}

export default RootNavigator;