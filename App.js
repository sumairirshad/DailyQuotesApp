import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './Contexts/UserContext';
import NavigationManager from './Navigation/NavigationManager';
import { Provider } from 'react-redux';
import 'expo-dev-client'
import store from './Stores/store';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

export default function App() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  return (
    <Provider store={store}>
      <UserProvider>
        <PaperProvider theme={theme} >
          <NavigationContainer>
            <NavigationManager />
          </NavigationContainer>
        </PaperProvider>
      </UserProvider>
    </Provider >
  );
}
