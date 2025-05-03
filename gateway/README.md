# Execução do Gateway (servidor e rRPC Stub)

1. No diretório gateway, ative o ambiente python:
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt

2. No diretório gateway, inicie o servidor:
    uvicorn app.web_server:app --reload --port 5000

3. Você pode acessar a documentação da API em http://localhost:5000/redoc e o Swagger UI em http://localhost:5000/docs