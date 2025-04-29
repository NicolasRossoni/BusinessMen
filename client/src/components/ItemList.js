import React from 'react';

export default function ItemList({ items, onEdit }) {
  return (
    <ul>
      {items.map(it => (
        <li key={it.id} style={{ margin: '8px 0' }}>
          {it.nome}{' '}
          <button onClick={() => onEdit(it)}>Editar</button>
        </li>
      ))}
    </ul>
  );
}
