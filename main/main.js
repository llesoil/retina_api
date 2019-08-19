// Launch the API

// connect to mongo database
var mongoose = require('mongoose');
var domain_name = 'localhost';
var mongo_port = 27017;
var db_name = 'retina';
var mongo_address = 'mongodb://' + domain_name + ':' + mongo_port + '/' + db_name;

mongoose.connect(mongo_address, {useNewUrlParser: true});

// write some examples in mongo
//require('../samples/data.js').load_examples();

// ask some requests to mongo
//

// run the server
var server_port = 1337;
var server_address = '127.0.0.1';
var data_version = '1.0';

var app = require('./server.js')(data_version);
app.listen(server_port);

console.log('Server running at http://' + server_address + ':' + server_port + '/');




