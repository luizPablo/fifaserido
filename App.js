import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './source/screens/home'
import MultiplyScreem from './source/screens/multiply'
import DrawScreen from './source/screens/draw'

import './source/config/statusBarConfig'

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen, navigationOptions: {
      header: null
    }
  },
  
  Classification: {
    screen: MultiplyScreem, navigationOptions: {
      title: 'Classificação',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#002d8a',
    }
  },
  Draw: {
    screen: DrawScreen, navigationOptions: {
      title: 'Sorteio',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#002d8a',
    }
  },
});

const App = createAppContainer(MainNavigator);

export default App;