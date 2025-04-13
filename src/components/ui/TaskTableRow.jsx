import React from "react";
import { v } from "../../styles/variables";

export const TaskTableRow = ({
  user,
  selectedIds,
  onCheckTask,
  onEdit,
  onDelete,
  renderStatus,
}) => (
  <tr key={user.id}>
    <td>
      <input
        type="checkbox"
        checked={selectedIds.includes(user.id)}
        onChange={(e) => onCheckTask(user.id, e.target.checked)}
        className="checkbox checkbox-primary"
      />
    </td>
    <td className="whitespace-nowrap">{user.id.slice(0, 6)}</td>
    <td className="whitespace-nowrap">{user.title}</td>
    <td className="max-w-xs">{user.description}</td>
    <td className="text-center text-lg">{user.icon}</td>
    <td className="whitespace-nowrap">{renderStatus(user.Status)}</td>
    <td className="whitespace-nowrap">
      <div className="flex flex-row gap-2">
        <button
          className="btn btn-soft btn-info"
          aria-label="Editar tarea"
          onClick={() => onEdit(user)}
        >
          {v.iconoEditar && <v.iconoEditar />}
        </button>
        <button
          className="btn btn-soft btn-error"
          aria-label="Eliminar tarea"
          onClick={() => onDelete(user.id)}
        >
          {v.iconoBasura && <v.iconoBasura />}
        </button>
      </div>
    </td>
  </tr>
);
