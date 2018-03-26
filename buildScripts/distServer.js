import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';


/*eslint-disable no-console*/

const port = 8080;
const app = express();

app.use(compression());
app.use(express.static('dist')); // to serve static files

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname,'../dist/index.html'))
})

app.get('/users', function(req, res){
	//real db placeholder (not mockup)
	res.json([
		{"id":1, "firstName":"Bob", "lastName":"Smith", "email":"bob@me.com"},
		{"id":2, "firstName":"Tammy", "lastName":"Norton", "email":"tammy@me.com"},
		{"id":3, "firstName":"Tina", "lastName":"Lee", "email":"lee.tina@me.com"}
	])
})


app.listen(port, function(err){
	if(err){
		console.log(err)
	}
	else{
		open('http://localhost:'+port)
	}
})
