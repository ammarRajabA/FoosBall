var matches=require("../controllers/matches.js");
var express=require("express");
var router=express.Router();

router.route('/')
		.get(function(req,res){
			matches.get_matches(function (err,results) {
				if (err) res.status(500).json({msg:"Server error"});
				else res.json(results);
			});
		})
		.post(function(req,res){
			matches.add_match({date:req.body.date,participant1:req.body.participant1,participant2:req.body.participant2,score1:req.body.score1,score2:req.body.score2},
				function(err,results){
					if (err) res.status(500).json({msg:"Server error"});
					else {
						res.json({msg:"Match added!",id:results.insertId});
					}
				})
		})
		.patch(function(req,res){
			req.body.date=new Date(req.body.date)
			matches.update_match(req.body,req.body.id,function(err,results){
				if (err) res.status(500).json({msg:"Server error"});
				else {
					res.json({msg:"Match updated!",id:results.insertId});
				}
			})
		})
		.delete(function(req,res){
			matches.del_matches(req.body.id,function (err,results) {
				if (err) res.status(500).json({msg:"Server error"});
				else res.json({msg:"Match deleted !"});
			});
		})

module.exports=router;
