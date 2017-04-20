var app = require('express')();
var mysql = require('mysql');
var connection  = require('express-myconnection');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'B0hBr0th3r$',
        database:'test'
    },'request')
);

app.get('/', function(req, res){
        req.getConnection(function(err,connection){
           var query=connection.query("SELECT * FROM checkbox",function(err,rows, fields){
                if(err){
                //fire when send a error from mysql server
                    console.log(error);
                }
                else{
			/*
		  res.render('index',{name:rows[0].name},function(err, html){
 			 // ...
			});*/
                }
            });
        });
        res.render('index', {title:'test title'});
        //res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('dragged', function(chkName, checkValue){
    io.emit('dragged', chkName, checkValue);
  });

});
/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'B0hBr0th3r$',
  database : 'test'
});

connection.connect(); 
connection.query('SELECT * FROM checkbox', function (error, results, fields) {
  if (error) throw error;
});
connection.end();
*/


http.listen(port, function(){
  console.log('listening on *:' + port);
});

