# 🧾 Server B - Gerenciador de Pedidos (gRPC + Golang)

Este é o **Server B** do sistema de estoque distribuído da disciplina **PSPD**. Ele gerencia pedidos (criar e listar) usando **gRPC** e foi desenvolvido em **Go**.

## 📦 Funcionalidades

- Criar pedido (`CriarPedido`)
- Listar pedidos (`ListarPedidos`)

## 📁 Estrutura

```
server_order_manager/
├── proto/
│   └── pedidos.proto          # Definição dos serviços gRPC
├── pedidospb/                 # Código gerado com protoc
├── server.go                  # Lógica do servidor
├── main.go                    # Inicialização gRPC
├── go.mod / go.sum            # Dependências do projeto
```

## ⚙️ Como rodar

### 1. Instale dependências

```bash
go mod tidy
```

### 2. Gere os stubs gRPC (caso altere o `.proto`)

```bash
protoc --go_out=. --go-grpc_out=. proto/pedidos.proto
```

### 3. Rode o servidor

```bash
go run main.go server.go
```

Servidor escutando em `localhost:50052`.

## 🔍 Testes com grpcurl

Certifique-se de ter o [grpcurl](https://github.com/fullstorydev/grpcurl) instalado.

### Criar pedido

```bash
grpcurl -plaintext -d '{"produto": "banana", "quantidade": 5}' localhost:50052 pedidos.PedidoService/CriarPedido
```

### Listar pedidos

```bash
grpcurl -plaintext -d '{}' localhost:50052 pedidos.PedidoService/ListarPedidos
```

## 🔧 Dependências principais

- [Go](https://golang.org/)
- [gRPC-Go](https://github.com/grpc/grpc-go)
- [protobuf](https://developers.google.com/protocol-buffers)
- [grpcurl](https://github.com/fullstorydev/grpcurl)
