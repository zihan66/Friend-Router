import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../pages/Login';
import Map from '../pages/Map';
import Invitation from '../pages/Invitation';
import InvitationView from '../pages/InvitationView';
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
    },
    Invitations: {
        screen: InvitationView,
        navigationOptions: { headerTitle: 'Invitations' }
    }
}
const homeStack = createStackNavigator(screens, {
    headerMode: 'screen',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFFFFF'
      }
    }
});

export default createAppContainer(homeStack);