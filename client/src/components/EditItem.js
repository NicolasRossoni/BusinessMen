import React, { useState } from 'react';

export default function EditItem({ item, onSave, onCancel }) {
  const [nome, setNome] = useState(item.nome);

  return (
    <div>
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <button onClick={() => onSave(item.id, nome)}>Salvar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}
