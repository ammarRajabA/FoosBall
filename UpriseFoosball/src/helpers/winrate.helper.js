export const winRate=(matches,topX)=>{
	var participants=[];
	var total=[];
	var wins=[];
	var rates=[];
	var top=[];
	//var equality=[];
	for (var i = matches.length - 1; i >= 0; i--) {
		if (participants.indexOf(matches[i].participant1)<0){
			participants.push(matches[i].participant1);
			total.push(0);
			wins.push(0);
		}
		if (participants.indexOf(matches[i].participant2)<0){
			participants.push(matches[i].participant2);
			total.push(0);
			wins.push(0);
		}
		total[participants.indexOf(matches[i].participant1)]+=1;
		total[participants.indexOf(matches[i].participant2)]+=1;
		if (matches[i].score1>matches[i].score2){
			wins[participants.indexOf(matches[i].participant1)]+=1;
		}
		else if (matches[i].score1<matches[i].score2){
			wins[participants.indexOf(matches[i].participant2)]+=1;
		}
		//else {
		//	equality[participants.indexOf(matches[i].participant1)]+=1
		//	equality[participants.indexOf(matches[i].participant2)]+=1
		//}
	}

	for (var i = 0; i < total.length ; i++) {
		var rate=(((wins[i]/total[i])*100).toFixed(2)).toString()+" %";
		rates.push(rate)
		top.push({rate:(wins[i]/total[i]),participant:participants[i]})
	}


	top.sort((a,b)=>b.rate-a.rate);
	top=top.slice(0,topX);

	
	var topParticipants=[];
	top.map((item)=>{
		topParticipants.push(item.participant)
	})


	return {
		participants,
		total,
		wins,
		rates,
		top:topParticipants
	}
}

export const winLossRate=(matches,topX)=>{
	var participants=[];
	var wins=[];
	var loss=[];
	var rates=[];
	var top=[];
	//var equality=[];
	for (var i = matches.length - 1; i >= 0; i--) {
		if (participants.indexOf(matches[i].participant1)<0){
			participants.push(matches[i].participant1);
			loss.push(0);
			wins.push(0);
		}
		if (participants.indexOf(matches[i].participant2)<0){
			participants.push(matches[i].participant2);
			loss.push(0);
			wins.push(0);
		}
		if (matches[i].score1>matches[i].score2){
			wins[participants.indexOf(matches[i].participant1)]+=1;
			loss[participants.indexOf(matches[i].participant2)]+=1;
		}
		else if (matches[i].score1<matches[i].score2){
			loss[participants.indexOf(matches[i].participant1)]+=1;
			wins[participants.indexOf(matches[i].participant2)]+=1;
		}
		//else {
		//	equality[participants.indexOf(matches[i].participant1)]+=1
		//	equality[participants.indexOf(matches[i].participant2)]+=1
		//}
	}

	for (var i = 0; i < loss.length ; i++) {
		var rate=((wins[i]/loss[i]).toFixed(2)).toString();
		rates.push(rate)
		top.push({rate:(wins[i]/loss[i]),participant:participants[i]})
	}


	top.sort((a,b)=>b.rate-a.rate);
	top=top.slice(0,topX);

	
	var topParticipants=[];
	top.map((item)=>{
		topParticipants.push(item.participant)
	})


	return {
		participants,
		loss,
		wins,
		rates,
		top:topParticipants
	}
}


export const winLossParticipantRate=(matches,topX)=>{
	var participants=[];
	var wins=[];
	var loss=[];
	var rates=[];
	var top=[];
	//var equality=[];
	for (var i = matches.length - 1; i >= 0; i--) {
		if (participants.indexOf(matches[i].participant1+" vs "+matches[i].participant2)<0){
			participants.push(matches[i].participant1+" vs "+matches[i].participant2);
			participants.push(matches[i].participant2+" vs "+matches[i].participant1);
			loss.push(0);
			loss.push(0);
			wins.push(0);
			wins.push(0);
		}
		if (matches[i].score1>matches[i].score2){
			wins[participants.indexOf(matches[i].participant1+" vs "+matches[i].participant2)]+=1;
			loss[participants.indexOf(matches[i].participant2+" vs "+matches[i].participant1)]+=1;
		}
		else if (matches[i].score1<matches[i].score2){
			loss[participants.indexOf(matches[i].participant1+" vs "+matches[i].participant2)]+=1;
			wins[participants.indexOf(matches[i].participant2+" vs "+matches[i].participant1)]+=1;
		}
		//else {
		//	equality[participants.indexOf(matches[i].participant1)]+=1
		//	equality[participants.indexOf(matches[i].participant2)]+=1
		//}
	}

	for (var i = 0; i < loss.length ; i++) {
		var rate=((wins[i]/loss[i]).toFixed(2)).toString();
		rates.push(rate)
		top.push({rate:(wins[i]/loss[i]),participant:participants[i]})
	}


	top.sort((a,b)=>b.rate-a.rate);
	top=top.slice(0,topX);

	
	var topParticipants=[];
	top.map((item)=>{
		topParticipants.push(item.participant)
	})


	return {
		participants,
		loss,
		wins,
		rates,
		top:topParticipants
	}
}