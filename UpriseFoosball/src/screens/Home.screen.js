import React from 'react';
import { Text, View , FlatList,Image} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import * as config from '../config';

import Card from '../components/Card/Card.component';
import FloatingButton from '../components/FloatingButton/FloatingButton.component'

import {getMatches,newMatch,postMatch,onParticipantChanged,onScoreChanged,updateMatch,deleteMatch} from '../actions/macthes.actions'

class ListHeader extends React.Component{
  render(){
    return(
        <Text style={{color:config.primaryColor,fontSize:40, textAlign:'center',fontWeight: 'bold'}}>Matches</Text>
      )
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation})=>({
    title: 'Uprise FoosBall',
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
  addMatch(){
    this.props.newMatch();
  }
  componentWillMount(){
    this.props.getMatches();
  }
  renderEmptyList(){
  	return(
  			<View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop:100}}>
  				<Image style={{width:200,height:200}} source={require('../resources/images/empty.png')}/>
  			</View>
  		)
  }
  render() {
    return (
            <View style={{flex:1}}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                ListHeaderComponent={<ListHeader/>}
                data={this.props.matches.data}
                ListEmptyComponent={this.renderEmptyList}
                keyExtractor={(item,index)=>item.id.toString()}
                renderItem={({item,index})=>(
                  <Card date={item.date.split('T')[0]}
                        time={item.date.split('T')[1].split('.')[0]}
                        score={[item.score1.toString(),item.score2.toString()]}
                        onScoreChanged={(value)=>this.props.onScoreChanged(index,value)}
                        onParticipantChanged={(value)=>this.props.onParticipantChanged(index,value)}
                        participants={[item.participant1,item.participant2]}
                        editMode={item.id<0 ? true:false}
                        onConfirm={item.id<0 ? ()=>this.props.postMatch(item):()=>this.props.updateMatch(item)}
                        onDiscard={()=>{}}
                        onDelete={()=>this.props.deleteMatch(item)}
                  />
                )}
                onRefresh={this.props.getMatches}
                refreshing={this.props.matches.loadingMatches}
              />
              {this.props.matches.addingNewMatch? <View></View>:<FloatingButton onPress={()=>this.addMatch()}/>}
            </View>
    );
  }
}

const mapStateToProps=(state)=>{
  return {matches:state.matches}
}

export default connect(mapStateToProps, {getMatches,newMatch,postMatch,onScoreChanged,onParticipantChanged,updateMatch,deleteMatch})(HomeScreen);