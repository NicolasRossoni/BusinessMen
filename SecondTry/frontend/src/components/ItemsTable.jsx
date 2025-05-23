import React, { useState, useEffect } from 'react';

const ItemsTable = ({ 
  initialItems = [], 
  onAddItem, 
  onUpdateItem, 
  onDeleteItem 
}) => {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ id: '', nome: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Atualiza os itens quando initialItems mudar (ex: quando vierem da API)
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleAddRow = async () => {
    setIsLoading(true);
    try {
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      const newItem = { id: newId, nome: '' };
      
      // Se tiver callback de API, usa ele; senão usa comportamento local
      if (onAddItem) {
        const addedItem = await onAddItem(newItem);
        // Não precisamos atualizar items localmente, pois o componente pai fará isso
        setEditingId(addedItem.id);
        setEditValues({ ...addedItem });
      } else {
        setItems([...items, newItem]);
        setEditingId(newId);
        setEditValues(newItem);
      }
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues({ ...item });
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      // Se tiver callback de API, usa ele; senão usa comportamento local
      if (onDeleteItem) {
        await onDeleteItem(id);
        // O componente pai atualizará items, não precisa fazer aqui
      } else {
        setItems(items.filter(item => item.id !== id));
      }
      
      if (editingId === id) {
        setEditingId(null);
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Se tiver callback de API, usa ele; senão usa comportamento local
      if (onUpdateItem) {
        await onUpdateItem(editingId, editValues);
        // O componente pai atualizará items, não precisa fazer aqui
      } else {
        setItems(items.map(item => 
          item.id === editingId ? editValues : item
        ));
      }
      setEditingId(null);
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>ID</th>
              <th style={{ width: '50%' }}>Nome</th>
              <th style={{ width: '30%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="id"
                      value={editValues.id}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  ) : (
                    item.id
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      name="nome"
                      value={editValues.nome}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  ) : (
                    item.nome
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <>
                      <button 
                        className="save" 
                        onClick={handleSave} 
                        disabled={isLoading}
                      >
                        {isLoading ? "Salvando..." : "Save"}
                      </button>
                      <button 
                        className="cancel" 
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="edit" 
                        onClick={() => handleEdit(item)}
                        disabled={isLoading || editingId !== null}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete" 
                        onClick={() => handleDelete(item.id)}
                        disabled={isLoading || editingId !== null}
                      >
                        {isLoading ? "Deletando..." : "Delete"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        className="add" 
        onClick={handleAddRow}
        disabled={isLoading || editingId !== null}
      >
        {isLoading ? "Adicionando..." : "Add Row"}
      </button>
    </div>
  );
};

export default ItemsTable;