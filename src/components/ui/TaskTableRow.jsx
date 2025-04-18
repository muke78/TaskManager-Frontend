import React from 'react';
// import { v } from '../../styles/variables';

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
    <td className="whitespace-nowrap">
      <div className="flex flex-row gap-2">
        <button
          className="btn btn-info btn-soft"
          aria-label="Editar tarea"
          onClick={() => onEdit(user)}
        >
          ✏️
          {/* {v.iconoEditar && <v.iconoEditar />} */}
        </button>
      </div>
    </td>
    <td className="whitespace-nowrap">{user.id.slice(0, 6)}</td>
    <td className="whitespace-nowrap">{user.title}</td>
    <td className="max-w-xs">{user.description}</td>
    <td className="text-center text-lg">{user.icon}</td>
    <td className="whitespace-nowrap">{renderStatus(user.Status)}</td>
    <td>
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn m-1">
          ...
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm"
        >
          <li>
            <button
              className="btn btn-error btn-soft"
              aria-label="Eliminar tarea"
              onClick={() => onDelete(user.id)}
            >
              🗑️
              {/* {v.iconoBasura && <v.iconoBasura />} */}
            </button>
          </li>
        </ul>
      </div>
    </td>
  </tr>
);
