import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), "../generated"))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.grpc_stub import GRPCStub


VM1_IP = "192.168.100.20" 
VM2_IP = "192.168.100.20"
PRODUCT_ADDR = f"{VM1_IP}:50051"
ORDER_ADDR = f"{VM2_IP}:50052"

app = FastAPI(title="Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stub = GRPCStub(
    product_addr=PRODUCT_ADDR,
    order_addr=ORDER_ADDR
)

# Data validation
class ProductIn(BaseModel):
    productName: str

class ProductOut(BaseModel):
    productName: str
    productId: str

class OrderIn(BaseModel):
    product: str
    quantity: int

class OrderOut(BaseModel):
    id: str
    product: str
    quantity: int

# /product
@app.post("/product", response_model=ProductOut)
def create_product(p: ProductIn):
    resp = stub.create_product(p.productName)
    return {"productName": resp.productName, "productId": resp.productId}

@app.get("/product", response_model=list[ProductOut])
def list_products():
    resp = stub.list_products()
    return [{"productName": p.productName, "productId": p.productId} for p in resp.products]

@app.delete("/product/{product_id}", response_model=ProductOut)
def delete_product(product_id: str):
    resp = stub.delete_product(product_id)
    return {"productName": resp.productName, "productId": resp.productId}

# /order
@app.post("/order", response_model=OrderOut)
def create_order(o: OrderIn):
    resp = stub.create_order(o.product, o.quantity)
    p = resp.pedido
    return {"id": p.id, "product": p.produto, "quantity": p.quantidade}

@app.get("/order", response_model=list[OrderOut])
def list_orders():
    resp = stub.list_orders()
    return [{"id": p.id, "product": p.produto, "quantity": p.quantidade} for p in resp.pedidos]
