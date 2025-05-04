var PROTO_PATH = __dirname + "/product.proto";

var parseArgs = require("minimist");
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

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: ["target", "name", "id"],
  });
  const target = argv.target || "localhost:50051";
  const productName = argv.name;
  const productId   = argv.id;
  const command = argv.command;
  const client = new product_proto.Product(
    target,
    grpc.credentials.createInsecure(),
  );

  if (!command) {
    console.error("Informe o comando com o --command=create|list|delete");
    return;
  } else if (command == "create") {
    if (!productName) {
      console.error("Selecione o nome do produto com o --name\n");
      return;
    }
    client.CreateProduct({ productName }, function (err, response) {
      if (err) {
        console.error("Error:", err);
        return;
      }
      let { productName, productId } = response;
      console.log(
        `Novo produto registrado > \nNome do produto : ${productName}\nID do produto: ${productId}`,
      );
    });
  } else if (command == "list") {
    client.ListProducts(null, function (err, response) {
      if (err) {
        console.error("Error: ", err);
        return;
      }
      let { products } = response;
      for (let item of products) {
        let { productName, productId } = item;
        console.log(
          `server response > \nNome do produto: ${productName}\nID do produto: ${productId}\n===\n`,
        );
      }
    });
  } else if (command === "delete") {
    if (!productId) {
      console.error("Selecione o ID do produto com o --id\n");
      return;
    }
    client.DeleteProduct({ productId }, function (err, response) {
      if (err) {
        console.error("Error:", err.message || err);
        return;
      }
      let { productName, productId } = response;
      console.log(
        `Produto deletado > \nNome do produto : ${productName}\nID do produto: ${productId}`,
      );
    });

  } else {
    console.error("Comando inválido. [list|create| delete]");
  }
}

main();
