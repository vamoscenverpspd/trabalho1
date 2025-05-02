package main

import (
	"context"
	"fmt"
	"sync"

	"server_order_manager/pedidospb"

	"github.com/google/uuid"
)

type PedidoServer struct {
	pedidospb.UnimplementedPedidoServiceServer
	mu      sync.Mutex
	pedidos []*pedidospb.Pedido
}

func (s *PedidoServer) CriarPedido(ctx context.Context, req *pedidospb.CriarPedidoRequest) (*pedidospb.CriarPedidoResponse, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	pedido := &pedidospb.Pedido{
		Id:        uuid.NewString(),
		Produto:   req.GetProduto(),
		Quantidade: req.GetQuantidade(),
	}

	s.pedidos = append(s.pedidos, pedido)

	fmt.Printf("Pedido criado: %+v\n", pedido)

	return &pedidospb.CriarPedidoResponse{Pedido: pedido}, nil
}

func (s *PedidoServer) ListarPedidos(ctx context.Context, req *pedidospb.ListarPedidosRequest) (*pedidospb.ListarPedidosResponse, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	return &pedidospb.ListarPedidosResponse{Pedidos: s.pedidos}, nil
}
