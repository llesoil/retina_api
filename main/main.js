// Launch the API
// connect to mongo database

var mongoose = require('mongoose');
var domain_name = '127.0.0.1';
var mongo_port = 27017;
/*var domain_name = 'aqmo01.irisa.fr';
var mongo_port = 27397;*/
var db_name = 'retina';
var mongo_address = 'mongodb://' + domain_name + ':' + mongo_port + '/' + db_name;
const util = require('util');

mongoose.connect(mongo_address, {useNewUrlParser: true});

util.log('Using mongo collection '+ mongo_address);

// write some examples in mongo
//require('../samples/data.js').load_examples();

// ask some requests to mongo
// check the requests.txt file in the samples folder

// run the server
var server_port = 1337;
var server_address = '127.0.0.1';
var api_url = 'http://' + server_address + ':' + server_port + '/';

// the data models are going to evolve
var data_version = '1.0';

var app = require('./server.js')(data_version);
app.listen(server_port);

util.log('Node server running at '+ api_url);

//launch python script
const spawn = require("child_process").spawn;

const data_dir = '/home/drone/data/'

const pythonProg = spawn('python3',["./python/receive.py", data_dir, api_url]);

// get python logs
pythonProg.stdout.on('data', (data) => {
	util.log('[Python] '+`${data}`);
});

pythonProg.stderr.on('data', (data) => {
    util.log('[Python] '+` error : ${data}`);
});