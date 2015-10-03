var express = require('express');
var app = express();

var path =require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); 

var TABLE = 'fuck';
app.use(express.static(path.join(__dirname, 'public')));

//configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//use middleware
app.use(express.static(__dirname + '/views'));




//db related 
var con = mysql.createConnection({
  host: "localhost",
    port     : '3306',
  user: "root",
  password: "",
  database: 'sanjay'
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});



//define routes
app.get('/',function(req,res){
res.render('index');

});

app.get('/login',function(req,res){
res.render('login.ejs');

});

app.post('/getData',function(req, res, next){
    var txtname = req.body.name;
    var ager = req.body.age;
    var pwdd = req.body.pd;
    console.log(txtname);
    console.log(ager);
    console.log(pwdd);
    
    var qurey= con.query('INSERT INTO  fuck (id , name,password) VALUES("' + ager + '","' +txtname+ '", "' +pwdd+ '") ', function(err, result) {
     
   if (err) throw err;
     
else res.send('success');
});
    console.log(qurey.sql);
 con.query('SELECT * FROM fuck ',function(err,rows){
  if(err) throw err;
 
  console.log('Data received from Db:\n');
  console.log(rows);
});
 
con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

});


app.get('/about',function(req,res){
res.render('about');

});


app.get('/contact',function(req,res){
res.render('contact.ejs');

});

app.listen(3000,function(){

console.log('server is running');


});