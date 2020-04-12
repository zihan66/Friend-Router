import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../pages/Login';
import Map from '../pages/Map';
import Invitation from '../pages/Invitation';
const screens = {
    Home: {
        screen: Login,
        navigationOptions: { header: null }
    },
    Next: {
        screen: Map,
        navigationOptions: { header: null }
    },
    Create: {
        screen: Invitation,
        navigationOptions: {header: null}
    }
}
const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);