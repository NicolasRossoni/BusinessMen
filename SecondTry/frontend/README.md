# ⚛️ Frontend App

React SPA com tabela interativa. Interface para gerenciamento de items via API.

**URLs:** [https://localhost:3000](https://localhost:3000) (dev) | [https://rossoni.click](https://rossoni.click) (prod)

## 📂 Estrutura

```
frontend/
├── src/
│   ├── App.js                # Componente principal
│   ├── components/
│   │   └── ItemsTable.jsx   # Tabela CRUD
│   └── services/
│       └── api.js           # HTTP client
├── package.json             # Dependências Node
└── public/                  # Assets estáticos
```

## 🖥️ Componentes

- **App.js:** Estado global + error handling
- **ItemsTable.jsx:** CRUD interface com inline editing
- **api.js:** Abstração HTTP para backend communication

## 🔗 API Integration

- **Base URL:** `http://localhost:5000` (configurable)
- **Fallback:** Dados locais se API offline
- **Methods:** GET, POST, PUT, DELETE via fetch()

## 🚀 Execução

### Local
```bash
npm install
npm start
```

### AWS (Amplify)

**Amplify.yml**

```bash
version: 1
applications:
  - appRoot: SecondTry/frontend     # onde está o seu package.json
    frontend:
      phases:
        preBuild:
          # instala tudo uma vez só
          commands:
            - npm ci --cache .npm --prefer-offline
        build:
          # só roda o build (já tem node_modules)
          commands:
            - npm run build
      artifacts:
        # dentro de SecondTry/frontend será gerada a pasta `build`
        baseDirectory: build
        files:
          - '**/*'
      cache:
        paths:
          - '.npm/**/*'
```