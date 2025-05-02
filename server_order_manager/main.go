package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"server_order_manager/pedidospb"
)

func main() {
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Erro ao escutar: %v", err)
	}

	grpcServer := grpc.NewServer()
	pedidospb.RegisterPedidoServiceServer(grpcServer, &PedidoServer{})
	reflection.Register(grpcServer)

	log.Println("Servidor Pedido rodando na porta 50052...")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Erro ao servir: %v", err)
	}
}
