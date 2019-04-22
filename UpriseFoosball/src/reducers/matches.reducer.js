var emptyMatch={
	date:new Date().toISOString(),
	participant1:'',
	participant2:'',
	score1:0,
	score2:0,
	id:-1
}

const INIT_STATE={
	loadingMatches:true,
	addingNewMatch:false,
	data:[]
}

export default matchesReducer=(state=INIT_STATE,action)=>{
	switch (action.type){
		case 'START_GET_MATCHES':
			return {...state,loadingMatches:true}
		case 'GOT_MATCHES':
			return {...state,data:action.payload,loadingMatches:false}
		case 'START_ADD_MATCH':
			var newData=[...state.data];
			newData.map((item,index)=>{
				if (item.id<0){
					newData.splice(index,1)
				}
			})
			return {...state,data:newData,addingNewMatch:false}
		case 'NEW_MATCH':
			return {...state,data:[emptyMatch,...state.data],addingNewMatch:true}
		case 'SCORE_CHANGED':
			var newData=[...state.data]
			newData[action.payload.index].score1=parseInt(action.payload.value[0])
			newData[action.payload.index].score2=parseInt(action.payload.value[1])
			return {...state,data:newData}
		case 'PARTICIPANT_CHANGED':
			var newData=[...state.data]
			newData[action.payload.index].participant1=action.payload.value[0]
			newData[action.payload.index].participant2=action.payload.value[1]
			return {...state,data:newData}
		default:
			return state
	}
}