import React, { Component } from 'react';
import { View,Text, TouchableOpacity, TextInput,Animated ,Easing , ToastAndroid, Alert} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as config from '../../config'

class Card extends Component{
	state={
		editMode:this.props.editMode,
		fadeAnim: new Animated.Value(0)
	}
	animateButtons(toV){
		return Animated.timing(
				this.state.fadeAnim,
				{
					easing: Easing.back(),
					toValue:toV,
					duration:500
				}
			)
	}
	renderDate(){
		return(
				<View style={styles.dateContainer}>
					<Text style={styles.dateLabel}>
						  {this.props.date+" at "}
						  {this.props.time}
					</Text>
				</View>
			)
	}
	renderScore(){
		return(
				<View style={styles.scoreContainer}>
					<TextInput onChangeText={(value)=>this.props.onScoreChanged([value,this.props.score[1]])} placeholder='0' keyboardType={'numeric'} style={styles.scoreLabel} editable={this.state.editMode} value={isNaN(this.props.score[0])? '':this.props.score[0]}/>
					<TextInput editable={false} style={styles.scoreLabel}>X</TextInput>
					<TextInput onChangeText={(value)=>this.props.onScoreChanged([this.props.score[0],value])} placeholder='0' keyboardType={'numeric'} style={styles.scoreLabel} editable={this.state.editMode} value={isNaN(this.props.score[1])? '':this.props.score[1]}/>
				</View>
			)
	}
	renderParticipants(){
		return(
				<View style={styles.participantsContainer}>
					<TextInput onChangeText={(value)=>this.props.onParticipantChanged([value,this.props.participants[1]])} placeholder='Who' editable={this.state.editMode} style={styles.participantLabel} value={this.props.participants[0]} />
					<TextInput editable={false} style={styles.participantLabel}>vs</TextInput>
					<TextInput onChangeText={(value)=>this.props.onParticipantChanged([this.props.participants[0],value])} placeholder='Who' editable={this.state.editMode} style={styles.participantLabel} value={this.props.participants[1]} />
				</View>
			)
	}
	discardChanges=()=>{
		this.props.onDiscard();
		this.setState({editMode:false,fadeAnim:new Animated.Value(0)})
	}
	saveChanges=()=>{
		this.props.onConfirm();
		this.setState({editMode:false,fadeAnim:new Animated.Value(0)})
	}
	deleteMatch=()=>{
		Alert.alert(
		  'Delete Item',
		  'Are you sure you want to do this?',
		  [
		  	{ text: 'Cancel',onPress: () => {}},
		    {text: 'OK', onPress: () => {
		    	this.props.onDelete();
				this.setState({editMode:false,fadeAnim:new Animated.Value(0)})
		    }},
		  ],
		  {cancelable: true},
		);
	}
	renderButtons(){
		if (this.state.editMode===false) return
		else{
			this.animateButtons(1).start()
			return(
				<Animated.View style={[styles.buttonContainer, {opacity:this.state.fadeAnim}]}>
					<Icon
						raised
		                reverse
		                name='close'
		                type='font-awesome'
		                color='#F37934'
		                onPress={this.discardChanges}
					/>
					<Icon
						raised
		                reverse
		                size={20}
		                name='trash'
		                type='font-awesome'
		                color='#E3411D'
		                onPress={this.deleteMatch}
					/>
					<Icon
						raised
		                reverse
		                name='check'
		                type='entypo'
		                color='#009688'
		                onPress={this.saveChanges}
					/>
				</Animated.View>
			)
		}
	}
	enableEditMode=()=>{
		this.setState(
			{editMode:true},
			()=>{
				ToastAndroid.show('Edit mode!', ToastAndroid.SHORT)
			}
		)						  
	}
	render(){
		return(
				<TouchableOpacity style={{flex:1}} activeOpacity={0.9}
								  onPress={this.enableEditMode}>
					<View style={styles.cardContainer}>
						{this.renderParticipants()}
						{this.renderScore()}
						{this.renderDate()}
						{this.renderButtons()}
					</View>
				</TouchableOpacity>
			)
	}
}

const styles={
	cardContainer:{
		flex:1,
		flexDirection:'column',
		elevation: 15,
		justifyContent:'flex-start',
		backgroundColor:config.cardsColor,
		width:'90%',
		alignSelf:'center',
		marginBottom:20,
		marginTop:20,
		shadowColor: '#000',	//IOS compaible shadow
	    shadowOffset: { width: 0, height: 1 },
	    shadowOpacity: 0.8,
	    shadowRadius: 1,
	    borderRadius:15
	},
	dateContainer:{
		flex:0.25,
		flexDirection:'row',
		justifyContent:'flex-start',
		paddingLeft:10,
		marginTop:10,
		marginBottom:10
	},
	dateLabel:{
		fontSize:14,
		color:config.primaryColor
	},
	scoreContainer:{
		flex:0.5,
		flexDirection:'row',
		justifyContent:'center',
	},
	scoreLabel:{
		fontSize:42,
		marginLeft:10,
		marginRight:10,
		color:config.primaryColor
	},
	participantsContainer:{
		flex:0.25,
		flexDirection:'row',
		justifyContent:'center',
		marginTop:10
	},
	participantLabel:{
		fontSize:20,
		marginRight:10,
		marginLeft:10,
		color:config.primaryColor
	},
	buttonContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around'
	}
}

export default connect(null, {})(Card);