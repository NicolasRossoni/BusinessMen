import React, { useEffect, useState } from 'react';
import { fetchItems, updateItem } from './api';
import ItemList from './components/ItemList';
import EditItem from './components/EditItem';

export default function App() {
  const [items, setItems] = useState([]);
  const [toEdit, setToEdit] = useState(null);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  function handleSave(id, nome) {
    updateItem(id, nome).then(updated => {
      setItems(items.map(it => it.id === id ? updated : it));
      setToEdit(null);
    });
  }

  return (
    <div style={{ padding: 20 }}>
      {toEdit
        ? <EditItem item={toEdit} onSave={handleSave} onCancel={() => setToEdit(null)} />
        : <ItemList items={items} onEdit={setToEdit} />
      }
    </div>
  );
}
