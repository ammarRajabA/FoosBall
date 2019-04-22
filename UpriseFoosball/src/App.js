import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import HomeScreen from './screens/Home.screen'
import WinRateScreen from './screens/WinRate.screen'
import WinLossRateScreen from './screens/WinRateLoss.screen'
import WinLossParticipantsScreen from './screens/WinRateLossParticipants.screen'

const HomeNavigator=createStackNavigator({
	Home: {screen: HomeScreen}
})
const WinRateNavigator=createStackNavigator({
	WinRate: {screen: WinRateScreen}
})
const WinLossRateNavigator=createStackNavigator({
	WinLoassRate: {screen: WinLossRateScreen}
})
const WinLoassRateParticipantNavigator=createStackNavigator({
	WinLoassRateParticipant: {screen: WinLossParticipantsScreen}
})

const drawerScreens = createDrawerNavigator(
	{
		Home: {screen:HomeNavigator},
		WinRate: {screen:WinRateNavigator,navigationOptions:{drawerLabel:'Win Rate'}},
		WinLoassRate:{screen:WinLossRateNavigator,navigationOptions:{drawerLabel:'Win/Loss Rate'}},
		WinLoassRateParticipant:{screen:WinLoassRateParticipantNavigator,navigationOptions:{drawerLabel:'Win/Loss Rate per Match'}}
	},
	{
		initialRouteName: 'Home'
	}
)

const Navigation = createAppContainer(drawerScreens);

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>

        );
    }
}

export default App;
