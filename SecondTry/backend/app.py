import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Isso permite requisições de qualquer origem (para desenvolvimento)

# Arquivo onde os itens são armazenados
ITEMS_FILE = 'data/items.json'

# Carregar itens do arquivo JSON
def load_items():
    try:
        with open(ITEMS_FILE, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        # Se o arquivo não existir ou for inválido, retorna lista vazia
        return []

# Salvar itens no arquivo JSON
def save_items(items):
    with open(ITEMS_FILE, 'w') as file:
        json.dump(items, file, indent=2)

# GET /items - Listar todos os itens
@app.route('/items', methods=['GET'])
def get_items():
    items = load_items()
    return jsonify(items)

# GET /items/<id> - Buscar um item específico
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    items = load_items()
    item = next((item for item in items if item['id'] == item_id), None)
    
    if item is None:
        return jsonify({"error": "Item not found"}), 404
        
    return jsonify(item)

# POST /items - Criar um novo item
@app.route('/items', methods=['POST'])
def create_item():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
        
    data = request.get_json()
    
    # Validação básica
    if 'nome' not in data:
        return jsonify({"error": "nome field is required"}), 400
    
    items = load_items()
    
    # Gera novo ID
    new_id = 1
    if items:
        new_id = max(item['id'] for item in items) + 1
    
    # Usar o ID enviado pelo cliente, se fornecido e não estiver em uso
    if 'id' in data:
        client_id = data['id']
        if not any(item['id'] == client_id for item in items):
            new_id = client_id
    
    # Criar novo item
    new_item = {
        'id': new_id,
        'nome': data['nome']
    }
    
    items.append(new_item)
    save_items(items)
    
    return jsonify(new_item), 201

# PUT /items/<id> - Atualizar um item existente
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
        
    data = request.get_json()
    
    # Validação básica
    if 'nome' not in data:
        return jsonify({"error": "nome field is required"}), 400
    
    items = load_items()
    
    # Encontrar o item pelo ID
    item_index = None
    for index, item in enumerate(items):
        if item['id'] == item_id:
            item_index = index
            break
    
    if item_index is None:
        return jsonify({"error": "Item not found"}), 404
    
    # Atualizar o item
    updated_item = {
        'id': item_id,
        'nome': data['nome']
    }
    
    items[item_index] = updated_item
    save_items(items)
    
    return jsonify(updated_item)

# DELETE /items/<id> - Deletar um item
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    items = load_items()
    
    # Verificar se o item existe
    if not any(item['id'] == item_id for item in items):
        return jsonify({"error": "Item not found"}), 404
    
    # Remover o item
    items = [item for item in items if item['id'] != item_id]
    save_items(items)
    
    return jsonify({"message": f"Item {item_id} deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True) 