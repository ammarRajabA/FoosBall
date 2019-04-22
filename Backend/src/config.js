var mysql = require('mysql');
require('dotenv').config()

const config={
	app:{
		port:{
			development:3000,
			production:process.env.PORT||80
		}
	},
	connection: mysql.createConnection({
		host     : 'db4free.net',
		user     : 'ammarrajab',
		password : process.env.pass,
		database : 'fencesketch',
		port     : 3306
	})
};


module.exports=config;