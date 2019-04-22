import React from 'react';
import { Text, View , FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import * as config from '../config';

import { winLossParticipantRate } from '../helpers/winrate.helper';

import Table from '../components/Table/Table.Component'

class WinRateLossParticipantsScreen extends React.Component {
	  static navigationOptions = ({navigation})=>({
	    title: 'Win/Loss Rate',
	    headerStyle: {
	      backgroundColor: config.primaryColor,
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
	    headerLeft: (
	          <View style={{marginLeft: 10}}>
	            <Icon
	              name="menu"
	              type="material"
	              size={25}
	              color='#FFFFFF'
	              onPress={() => navigation.toggleDrawer()}
	            />
	          </View>
	        )
	  });
  state={participants:[],loss:[],wins:[],rates:[],top:[]}
  componentDidMount(){
  	var data=winLossParticipantRate(this.props.matches.data,3); //mark top 3
  	this.setState(data);
  }
  componentDidUpdate(prevProps){
  	if (prevProps.matches !== this.props.matches){
  		var data=winLossParticipantRate(this.props.matches.data,3); //mark top 3
  		this.setState(data);
  	}
  }
  render() {
    return (
            <View style={{flex:1}}>
            	<Table data={this.state} keys={['participants','loss','wins','rates']} heighlight={this.state.top} header={['Participant','Loss', 'Wins', 'Win/Loss']}/>
            </View>
    );
  }
}

const mapStateToProps=(state)=>{
  return {matches:state.matches}
}

export default connect(mapStateToProps, {})(WinRateLossParticipantsScreen);

