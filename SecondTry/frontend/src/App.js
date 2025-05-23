import React, { useState, useEffect } from 'react';
import ItemsTable from './components/ItemsTable';
import ApiService from './services/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar os itens da API
  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllItems();
      setItems(data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
      setError("Não foi possível carregar os itens. Verifique se o backend está rodando.");
      // Usar dados de exemplo em caso de erro
      setItems([
        { id: 1, nome: "Item A (Exemplo)" },
        { id: 2, nome: "Item B (Exemplo)" },
        { id: 3, nome: "Item C (Exemplo)" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar um novo item
  const handleAddItem = async (item) => {
    try {
      const newItem = await ApiService.createItem(item);
      setItems([...items, newItem]);
      return newItem;
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      // Fallback para demonstração (simula ID)
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      const fallbackItem = { ...item, id: newId };
      setItems([...items, fallbackItem]);
      return fallbackItem;
    }
  };

  // Função para atualizar um item
  const handleUpdateItem = async (id, item) => {
    try {
      const updatedItem = await ApiService.updateItem(id, item);
      setItems(items.map(i => i.id === id ? updatedItem : i));
      return updatedItem;
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      // Fallback para demonstração
      setItems(items.map(i => i.id === id ? item : i));
      return item;
    }
  };

  // Função para deletar um item
  const handleDeleteItem = async (id) => {
    try {
      await ApiService.deleteItem(id);
      setItems(items.filter(i => i.id !== id));
      return true;
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      // Fallback para demonstração
      setItems(items.filter(i => i.id !== id));
      return true;
    }
  };

  // Carregar itens quando o componente montar
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📋 Items Management</h1>
      </header>
      <main>
        <h2>My Items</h2>
        <p>Manage your items with this beautiful table interface.</p>
        
        {loading ? (
          <div className="loading">Carregando itens...</div>
        ) : error ? (
          <div className="error-message">
            {error}
            <button onClick={loadItems} className="retry-button">Tentar Novamente</button>
          </div>
        ) : (
          <ItemsTable 
            initialItems={items} 
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </main>
    </div>
  );
}

export default App; 