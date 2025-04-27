var PROTO_PATH = __dirname + '/Greeter.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
var hello_proto = grpc.loadPackageDefinition(packageDefinition).greeter;

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target = argv.target || 'localhost:50051';

  var client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());

  var user = argv._[0] || 'world';

  client.SayHello({ requestName: user }, function (err, response) {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('response > ', response.responseMessage);
  });
}

main();

