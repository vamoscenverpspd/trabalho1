# 🧾 Gateway

Este é o **Gateway (servidor web e gRPC Stub)** do sistema de estoque distribuído da disciplina **PSPD**. Ele permite o cliente da aplicação interagir com os servidores de produto e pedido.

## 🔧 Pré-requisitos

   - Python 3.11 ou superior
   - venv para gerenciamento de ambientes virtuais

## ⚙️ Como executar

### Primeiramente, certifique-se de estar no diretório gateway

### 1. Ative o ambiente python

```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 2. Gere os stubs gRPC (caso altere algum dos arquivos `.proto`)

```bash
python -m grpc_tools.protoc \
  -I protos \
  --python_out=./generated \
  --grpc_python_out=./generated \
  protos/product.proto \
  protos/pedidos.proto
```

### 3. Inicie o servidor

```bash
uvicorn app.web_server:app --reload --port 5000
```

### 4. Você pode acessar a documentação da API em

    http://localhost:5000/redoc 

### 5. Você pode acessar o Swagger UI em

    http://localhost:5000/docs