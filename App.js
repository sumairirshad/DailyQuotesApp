// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import DrawerNavigator from './DrawerNavigator';
import { useContext, useEffect, useState } from 'react';
import { UserProvider } from './Contexts/UserContext';
import NavigationManager from './Navigation/NavigationManager';

export default function App() {

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading process
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 5000); // Adjust the time duration as needed
  // }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <NavigationManager />
      </NavigationContainer>
    </UserProvider>
  );
}
