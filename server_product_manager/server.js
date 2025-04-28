var PROTO_PATH = __dirname + "/product.proto";

var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var product_proto = grpc.loadPackageDefinition(packageDefinition).product;

/**
 * Implements the Product RPC's methods.
 */
var productId = 1;
var products = [];
function CreateProduct(call, callback) {
  let { productName } = call.request;
  let newProduct = { productName, productId };
  products = [...products, newProduct];
  productId++;
  console.log("New product registered: ", newProduct);
  callback(null, newProduct);
}
function ListProducts(call, callback) {
  console.log("Fetched products");
  callback(null, { products });
}

/**
 * Starts an RPC server that receives requests for the Product's service
 */
function main() {
  var server = new grpc.Server();
  server.addService(product_proto.Product.service, {
    CreateProduct,
    ListProducts,
  });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`gRPC listening on ${port}`);
    },
  );
}

main();
