import React, { Component } from 'react';
import { View,Text, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as config from '../../config';

class Row extends Component{
	render(){
		return(
				<View style={[
								styles.rowContainer,
								this.props.header? styles.rowContainer.header:
								this.props.heighlight? styles.rowContainer.heighlightRow:styles.rowContainer.row
							]}>
					{
						this.props.rowData.map((item)=>{
							return(
								<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<Text style={this.props.header? styles.headerCellStyle:styles.rowCellStyle}>{item.toString()}</Text>
								</View>
							)
						})
					}
				</View>
			)
	}
}

class Table extends Component{
	renderRow(item,index){
		var heighlightRow=false
		if (this.props.heighlight.indexOf(item)>=0) {
			heighlightRow=true
		};

		var row=[]
		this.props.keys.map((item)=>{
			row.push(this.props.data[item][index])
		})

		return(
				<Row rowData={row} header={false} heighlight={heighlightRow} />
			)
	}
	render(){
		return(
				<View style={styles.tableContainer}>
					<FlatList
		                keyboardShouldPersistTaps={'handled'}
		                ListHeaderComponent={<Row rowData={this.props.header} header={true}/>}
		                data={this.props.data[this.props.keys[0]]}
		                keyExtractor={(item,index)=>index.toString()}
		                renderItem={({item,index})=>this.renderRow(item,index)}
		              />
				</View>
			)
	}
}

const styles={
	rowContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around',
		paddingTop:2,
		paddingBottom:2,
		header:{
			backgroundColor:config.secondaryColor,
			paddingTop:10,
			paddingBottom:10
		},
		row:{
			backgroundColor:"#FFFFFF"
		},
		heighlightRow:{
			backgroundColor:"#FFD700"
		}
	},
	headerCellStyle:{
		fontSize:16,
		fontWeight:'bold',
		color:"#FFFFFF",
		textAlign:'center'
	},
	rowCellStyle:{
		color:config.primaryColor,
		fontSize:16,
		textAlign:'center'
	},
	tableContainer:{
		flex:1,
		
	}
}

export default connect(null, {})(Table);