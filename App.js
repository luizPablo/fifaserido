import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './source/screens/home'
import MultiplyScreem from './source/screens/multiply'
import DrawScreen from './source/screens/draw'
import Splash from './source/screens/splash'

import './source/config/statusBarConfig'

const MainNavigator = createStackNavigator({
  Splash: {
    screen: Splash, navigationOptions: {
      header: null
    }
  },

  Home: {
    screen: HomeScreen, navigationOptions: {
      header: null
    }
  },
  
  Classification: {
    screen: MultiplyScreem, navigationOptions: {
      title: 'Classificação',
      headerStyle: {
        backgroundColor: '#3121d6',
      },
      headerTintColor: '#fff',
    }
  },

  Draw: {
    screen: DrawScreen, navigationOptions: {
      title: 'Sorteio',
      headerStyle: {
        backgroundColor: '#3121d6',
      },
      headerTintColor: '#fff',
    }
  },
});

const App = createAppContainer(MainNavigator);

export default App;