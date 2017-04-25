var app = require('express')();
var mysql = require('mysql');
var connection  = require('express-myconnection');
var bodyParser = require('body-parser');

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
        database:'lightboard'
    },'request')
);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
	var rows;
	var rows2, rows3, rows4, rows5, rows6;

        req.getConnection(function(err,connection){
           var query=connection.query("SELECT * FROM column6",function(err,rows6, fields){
                if(err){console.log(error);}
                else{rows6=rows6;


          var query=connection.query("SELECT * FROM column5",function(err,rows5, fields){
                if(err){console.log(error);}
                else{rows5=rows5;



		var query=connection.query("SELECT * FROM column4",function(err,rows4, fields){
                if(err){console.log(error);}
                else{rows4=rows4;



	 var query=connection.query("SELECT * FROM column3",function(err,rows3, fields){
                if(err){console.log(error);}
                else{rows3=rows3;

           var query=connection.query("SELECT * FROM column2",function(err,rows2, fields){
                if(err){console.log(error);}
		else{rows2=rows2;
           		var query=connection.query("SELECT * FROM column1",function(err,rows, fields){
                		if(err){console.log(error);}
                		else{rows=rows;
				res.render('index', {rows:rows,rows2:rows2,rows3:rows3,rows4:rows4,rows5:rows5,rows6:rows6});
				}
            		});
		}
	   });

	   }}); //end column3


           }}); //end column4


           }}); //end column5


           }}); //end column6



	});
	
});

app.get('/new',function(req, res){
 req.getConnection(function(err,connection){

	var query=connection.query("(SELECT * FROM column1) UNION (SELECT * FROM column2) UNION (SELECT * FROM column3) UNION (SELECT * FROM column4) UNION (SELECT * FROM column5) UNION (SELECT * FROM column6)",function(err,rows, fields){
        	if(err){console.log(error);}
                else{rows=rows;
                	res.render('new', {rows:rows});

		}
        });


 });
});


app.post('/tests', function(req, res){	
	
        req.getConnection(function(err,connection){


                var query= connection.query("UPDATE column6 SET io=BINARY(?) WHERE id=?", [req.body.io, req.body.id], function(err, rows){
                        if(err){console.log('ERROR: '+err);}
                        else{



                var query= connection.query("UPDATE column5 SET io=BINARY(?) WHERE id=?", [req.body.io, req.body.id], function(err, rows){
                        if(err){console.log('ERROR: '+err);}
                        else{



                var query= connection.query("UPDATE column4 SET io=BINARY(?) WHERE id=?", [req.body.io, req.body.id], function(err, rows){
                        if(err){console.log('ERROR: '+err);}
                        else{



                var query= connection.query("UPDATE column3 SET io=BINARY(?) WHERE id=?", [req.body.io, req.body.id], function(err, rows){
                        if(err){console.log('ERROR: '+err);}
                        else{



		var query= connection.query("UPDATE column2 SET io=BINARY(?) WHERE id=?", [req.body.io, req.body.id], function(err, rows){
                        if(err){console.log('ERROR: '+err);}
                        else{
          			var query= connection.query("UPDATE column1 SET io=BINARY(?) WHERE id=?", [req.body.io, req.body.id], function(err, rows){
    					if(err){console.log('ERROR: '+err);}
               			 	else{
					console.log('succesful post '+req.body.io);	
					//res.send('successful post'+rows)
					}
             			});
			}
		});

		}});//end column3


                }});//end column4

                }});//end column5

                }});//end column6

	});
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('dragged', function(chkName, checkValue){
    io.emit('dragged', chkName, checkValue);
  });

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});

