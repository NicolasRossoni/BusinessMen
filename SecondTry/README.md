# 🏗️ SecondTry - Full-Stack Items Management System

Sistema completo de gerenciamento de itens construído com **Flask (backend)** e **React (frontend)**, oferecendo uma interface moderna para operações CRUD com persistência de dados.

## 📁 Estrutura do Projeto

```
SecondTry/
├── backend/                     # API REST Flask
│   ├── app.py                  # Aplicação principal com endpoints
│   ├── requirements.txt        # Dependências Python
│   ├── data/
│   │   └── items.json         # Persistência de dados
│   └── README.md              # Documentação técnica backend
│
├── frontend/                   # Aplicação React
│   ├── src/
│   │   ├── App.js             # Componente principal
│   │   ├── components/
│   │   │   └── ItemsTable.jsx # Tabela interativa de itens
│   │   └── services/
│   │       └── api.js         # Service layer para comunicação HTTP
│   ├── package.json           # Dependências Node.js
│   └── README.md              # Documentação técnica frontend
│
└── README.md                  # Este arquivo - documentação geral
```

## 🎯 Funcionalidades Principais

### Backend (Flask API)
- **API RESTful** completa com 5 endpoints principais
- **Persistência JSON** para armazenamento simples de dados
- **CORS habilitado** para comunicação cross-origin
- **Validação de dados** com tratamento de erros robusto
- **Auto-geração de IDs** únicos para novos itens
- **Endpoints disponíveis:**
  - `GET /items` - Lista todos os itens
  - `GET /items/<id>` - Busca item específico por ID
  - `POST /items` - Cria novo item (requer campo 'nome')
  - `PUT /items/<id>` - Atualiza item existente
  - `DELETE /items/<id>` - Remove item por ID

### Frontend (React App)
- **Interface responsiva** com tabela interativa
- **Edição inline** ativada por duplo clique
- **Adição dinâmica** de novos itens
- **Confirmação de remoção** para prevenir perdas acidentais
- **Estados de loading** e tratamento de erros
- **Fallback offline** - funciona mesmo sem backend conectado
- **Service Layer** para abstração das chamadas HTTP

## 🔧 Arquitetura Técnica

### Backend Architecture
- **Framework:** Flask 3.1.1 com Flask-CORS
- **Persistência:** JSON file-based (`data/items.json`)
- **Estrutura de dados:** `{id: number, nome: string}`
- **Padrão:** REST API com métodos HTTP semânticos
- **Error Handling:** Códigos HTTP apropriados (200, 201, 400, 404)

### Frontend Architecture
- **Framework:** React 18.2.0 com hooks (useState, useEffect)
- **Comunicação:** Fetch API via service abstraction
- **Estado:** Local state management sem Redux
- **UI/UX:** CSS custom com design responsivo
- **Resilience:** Graceful degradation quando API offline

### Comunicação Entre Camadas
```
React Frontend (port 3000)
    ↓ HTTP Requests
Service Layer (api.js)
    ↓ REST calls
Flask Backend (port 5000)
    ↓ File I/O
JSON Database (items.json)
```

## 🚀 Setup e Execução

### Pré-requisitos
- **Python 3.7+** para o backend
- **Node.js 16+** com npm para o frontend

### Execução Completa

**1. Backend (Terminal 1):**
```bash
cd SecondTry/backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou: venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```
*Backend estará disponível em http://localhost:5000*

**2. Frontend (Terminal 2):**
```bash
cd SecondTry/frontend
npm install
npm start
```
*Frontend estará disponível em http://localhost:3000*

## 🧪 Testando a Aplicação

### Testes Backend (curl)
```bash
# Listar itens
curl http://localhost:5000/items

# Buscar item específico
curl http://localhost:5000/items/1

# Criar novo item
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"nome": "Novo Item"}'

# Atualizar item
curl -X PUT http://localhost:5000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Item Atualizado"}'

# Deletar item
curl -X DELETE http://localhost:5000/items/1
```

## 🔄 Fluxo de Dados

1. **Inicialização:** Frontend carrega itens via GET /items
2. **Criação:** Usuário adiciona item → POST /items → Estado atualizado
3. **Edição:** Duplo clique → PUT /items/:id → Estado sincronizado
4. **Remoção:** Confirmação → DELETE /items/:id → Item removido do estado
5. **Persistência:** Todas alterações são salvas em data/items.json

## 📋 Modelo de Dados

```javascript
Item: {
  id: number,      // Único, auto-gerado ou fornecido
  nome: string     // Campo obrigatório
}
```