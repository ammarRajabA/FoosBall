import React, { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as config from '../../config'

class FloatingButton extends Component{
	render(){
		return(
				<TouchableOpacity style={styles.container}>
					<Icon
						name='plus-circle'
  						type='font-awesome'
  						size={70}
  						color={config.secondaryColor}
  						onPress={this.props.onPress}
					/>
				</TouchableOpacity>
			)
	}
}

const styles={
	container:{
		flex:1,
		position:'absolute',
		right:10,
		bottom:5,
		elevation: 1
	}
}

export default connect(null, {})(FloatingButton);