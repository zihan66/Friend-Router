import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../pages/Login';
import Map from '../pages/Map';
import Invitation from '../pages/Invitation';
const screens = {
    Home: {
        screen: Login,
        navigationOptions: { headerShown: false, headerTitle: 'Login' }
    },
    Next: {
        screen: Map,
        navigationOptions: { headerShown: false, headerTitle: 'Map' }
    },
    Create: {
        screen: Invitation,
        navigationOptions: { headerShown: false }
    }
}
const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);