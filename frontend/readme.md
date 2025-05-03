# 🧾 FrontEnd

Este é o **FrontEnd** do sistema de estoque distribuído da disciplina **PSPD**. Ele fornece uma interface visual para usar os endpoints de produtos e pedidos.

## ⚙️ Como rodar

### 1. Instale o Node v20.11.1

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 20.11.1
nvm use 20.11.1
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o servidor

```bash
npm run dev
```

Servidor escutando em `localhost:5173`.
