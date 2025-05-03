import grpc
from grpc import Channel

from generated.product_pb2 import RequestProduct, RequestProductId, EmptyRequest
from generated.product_pb2_grpc import ProductStub
from generated.pedidos_pb2 import CriarPedidoRequest, ListarPedidosRequest
from generated.pedidos_pb2_grpc import PedidoServiceStub

class GRPCStub:
    def __init__(self,
                 product_addr: str = "localhost:50051",
                 order_addr: str = "localhost:50052"):
        # Conect to servers A and B (Product and Order)
        self._product_channel: Channel = grpc.insecure_channel(product_addr)
        self._order_channel: Channel = grpc.insecure_channel(order_addr)

        self.product_stub = ProductStub(self._product_channel)
        self.order_stub = PedidoServiceStub(self._order_channel)

    # === Product ===
    def create_product(self, name: str):
        req = RequestProduct(productName=name)
        return self.product_stub.CreateProduct(req)

    def list_products(self):
        return self.product_stub.ListProducts(EmptyRequest())

    def delete_product(self, product_id: str):
        req = RequestProductId(productId=product_id)
        return self.product_stub.DeleteProduct(req)

    # === Order ===
    def create_order(self, product: str, quantity: int):
        req = CriarPedidoRequest(produto=product, quantidade=quantity)
        return self.order_stub.CriarPedido(req)

    def list_orders(self):
        return self.order_stub.ListarPedidos(ListarPedidosRequest())
