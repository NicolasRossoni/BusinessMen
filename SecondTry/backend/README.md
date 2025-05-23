# ⚙️ Backend API

Flask REST API com persistência JSON. CRUD completo para entidade `items`.

## 📂 Estrutura

```
backend/
├── app.py              # Flask app + endpoints
├── requirements.txt    # Dependências Python  
├── Dockerfile         # Container image
├── run.sh            # Docker execution
└── data/
    └── items.json    # Storage JSON
```

## 📡 Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| `GET` | `/items` | Lista todos |
| `GET` | `/items/<id>` | Busca por ID |
| `POST` | `/items` | Cria novo |
| `PUT` | `/items/<id>` | Atualiza |
| `DELETE` | `/items/<id>` | Remove |

**Payload:** `{"nome": "string"}`  
**Response:** `{"id": number, "nome": "string"}`

## 🚀 Execução

### Local
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Docker
```bash
./run.sh
```

### AWS (EC2)
```bash
# Via Docker no EC2
docker build -t backend-api .
docker run -d --name api -p 5000:5000 backend-api
```

**URLs:** `localhost:5000` (local) | `ec2-instance:5000` (AWS)

## 🔧 Funcionalidades

- CRUD completo de itens
- Persistência em JSON (`data/items.json`)
- CORS habilitado para desenvolvimento
- Validação de dados de entrada
- Auto-geração de IDs únicos
- Tratamento de erros HTTP 