var config=require('../config');

function add_match(data,callback){
	config.connection.query('INSERT INTO matches SET ?', data,
    function (error,results,fields){
    	if (error) return callback(error,[]);
    	else return callback(null,results);
	});
}

function update_match(data,matchId,callback){
    config.connection.query('UPDATE matches SET ? WHERE id="'+matchId.toString()+'"',data,function(err,results){
        if (err) return callback(err,[]);
        else return callback(null,results);
    })
}

function get_matches(callback){
	config.connection.query('SELECT * FROM matches ORDER BY date DESC',function(error, results, fields){
    if (error) return callback(error,[]);
    else return callback(null,results);
  })
}

function del_matches(id,callback){
    config.connection.query('DELETE FROM matches WHERE id=?',[id],function(error, results, fields){
    if (error) return callback(error,[]);
    else return callback(null,results);
  })
}

module.exports={
	"add_match":add_match,
    "update_match":update_match,
	"get_matches":get_matches,
    "del_matches":del_matches
}
