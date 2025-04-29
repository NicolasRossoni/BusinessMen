const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = __dirname + '/data.json';

function readData() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}
function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET /api/items → lista todos
app.get('/api/items', (req, res) => {
  res.json(readData());
});

// PUT /api/items/:id → edita nome
app.put('/api/items/:id', (req, res) => {
  const id = +req.params.id;
  const { nome } = req.body;
  const items = readData();
  const idx = items.findIndex(it => it.id === id);
  if (idx === -1) return res.status(404).send();
  items[idx].nome = nome;
  writeData(items);
  res.json(items[idx]);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
