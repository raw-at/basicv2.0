var express = require('express');
var app = express();

var mongodb  = require('mongodb');
var mongoose = require('mongoose');

//body-parser

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//handlebars for view engine
var handlebars = require('express-handlebars');
handlebars = handlebars.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//port
var port = process.env.PORT || 3000;

var morgan = require('morgan');

mongoose.connect("mongodb://localhost:27017/pantelwar");

var contactSchema = mongoose.Schema({

	name:String,
	email:String,
	phone:Number,
	message:String


});

var Contactmodel = mongoose.model('Contactmodel',contactSchema);

app.use(morgan('dev'));

app.get('/',function(req,res){

	res.render('home');
});

app.post('/contact',function(req,res){

	console.log(req.body);

	var Contact = new Contactmodel();
	Contact.name = req.body.name;
	Contact.email = req.body.email;
	Contact.phone = req.body.phone;
	Contact.message = req.body.message;

	Contact.save(function(err){

		if(err)
			console.log(err);
		else
			res.render('home');

	})

});

app.use(express.static(__dirname+'/public'));

app.listen(port,function(){

	console.log('Server is running')
})