const mysql=require('mysql');
const dotenv=require('dotenv').config();

const connection=mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT,
    multipleStatements: true
});

connection.connect((err)=>{
    if(err) {console.log(err);}
    else{
      console.log(connection.state)
    }

});

module.exports=connection;

