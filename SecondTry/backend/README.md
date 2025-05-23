# ⚙️ Backend API

API REST Flask para gerenciamento de itens com persistência JSON.

## 🚀 Execução

```bash
python -m venv venv
source venv/bin/activate # Em fish: source venv/bin/activate.fish
pip install -r requirements.txt
python app.py
```

## 📡 Endpoints

- `GET /items` - Lista todos os itens
- `GET /items/<id>` - Busca item específico
- `POST /items` - Cria novo item
- `PUT /items/<id>` - Atualiza item existente  
- `DELETE /items/<id>` - Remove item

## 🔧 Funcionalidades

- CRUD completo de itens
- Persistência em JSON (`data/items.json`)
- CORS habilitado para desenvolvimento
- Validação de dados de entrada
- Auto-geração de IDs únicos
- Tratamento de erros HTTP 