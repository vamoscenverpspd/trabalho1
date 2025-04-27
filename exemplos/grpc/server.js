var PROTO_PATH = __dirname + '/Greeter.proto';

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

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, { responseMessage: 'Eye u kyambote ' + call.request.requestName + ' ?' });
}

/**
 * Starts an RPC server that receives requests for the Greeter service
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, { SayHello: sayHello });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`gRPC listening on ${port}`);
  });
}

main();

