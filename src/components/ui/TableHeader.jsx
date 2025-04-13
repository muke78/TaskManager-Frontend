import React from "react";

export const TaskTableHeader = ({ isChecked, onCheckAll }) => (
  <thead>
    <tr>
      <th>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckAll}
          className="checkbox checkbox-primary"
        />
      </th>
      <th>ID</th>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Icon</th>
      <th>Estatus</th>
      <th>Acciones</th>
    </tr>
  </thead>
);
