// In App.js in a new project

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { colors } from '../theme';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Weather App',
        headerShown: true,
        headerTransparent: true,
        headerTintColor: colors.text,
      },
    },
    Forecast: {
      screen: DetailsScreen,
      options: {
        title: 'Weather Forecast',
        headerShown: true,
        headerTransparent: true,
        headerTintColor: colors.text,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
