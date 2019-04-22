import * as config from '../config'
import {ToastAndroid} from 'react-native';

export const getMatches=()=>{
	return (dispatch)=>{
		dispatch({type:'START_GET_MATCHES'})
		fetch(`${config.SERVER_HOST}/matches`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
        })
            .then(data => {
                if (data.ok) data.json().then(
                	(matches) => {
                		dispatch({ type: 'GOT_MATCHES', payload: matches })
                	});
            })
            .catch(() => {});
	}
}

export const postMatch=(match)=>{
	return (dispatch)=>{
		dispatch({type:'START_ADD_MATCH'})
		fetch(`${config.SERVER_HOST}/matches`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(match)
        })
            .then(data => {
                if (data.ok) data.json().then(
                	(response) => {
                		ToastAndroid.show('Match added!', ToastAndroid.SHORT)
                		getMatches()(dispatch)
                	});
            })
            .catch(() => {});
	}
}

export const updateMatch=(match)=>{
	return (dispatch)=>{
		fetch(`${config.SERVER_HOST}/matches`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(match)
        })
            .then(data => {
                if (data.ok) data.json().then(
                	(response) => {
                		ToastAndroid.show('Match updated!', ToastAndroid.SHORT)
                		getMatches()(dispatch)
                	});
            })
            .catch(() => {});
	}
}

export const deleteMatch=(match)=>{
    return (dispatch)=>{
        dispatch({type:'START_ADD_MATCH'})
        fetch(`${config.SERVER_HOST}/matches`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(match)
        })
            .then(data => {
                if (data.ok) data.json().then(
                    (response) => {
                        ToastAndroid.show('Match deleted !', ToastAndroid.SHORT)
                        getMatches()(dispatch)
                    });
            })
            .catch(() => {});
    }
}


export const newMatch=()=>{
	return {type:'NEW_MATCH'}
}

export const onScoreChanged=(index,value)=>{
	return {type:'SCORE_CHANGED',payload:{value,index}}
}

export const onParticipantChanged=(index,value)=>{
	return {type:'PARTICIPANT_CHANGED',payload:{value,index}}
}