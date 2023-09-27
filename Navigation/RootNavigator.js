import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Categories" component={CategoriesScreen} />
        </Drawer.Navigator>
    );
}

export default RootNavigator;