import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../pages/Login';
import Map from '../pages/Map';

const screens = {
    Home: {
        screen: Login
    },
    Map: {
        screen: Map 
    }
}
const homeStack = createStackNavigator(screens, headerMode='none');

export default createAppContainer(homeStack);