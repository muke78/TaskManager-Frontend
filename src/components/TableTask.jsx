import { v } from '../styles/variables';
import { ModalAgregarTareas } from './ModalAgregarTareas';
import { ModalEditarTareas } from './ModalEditarTareas';
import { StatusFilter } from './ui/StatusFIlter';
import { TaskTableHeader } from './ui/TableHeader';
import { TaskTableRow } from './ui/TaskTableRow';
import { useTableTask } from '../hooks/useTableTask';

export const TableTask = ({ openModaSaveTask, setOpenModaSaveTask }) => {
  const {
    openModaUpdateTask,
    setOpenModaUpdateTask,
    selectedUser,
    setSelectedUser,
    activeFilter,
    // setActiveFilter,
    isChecked,
    selectedIds,
    displayData,
    table,
    flexRender,
    handleOpenUpdateTask,
    handleStatusFilter,
    handleCheckTask,
    handleCheckAll,
    eliminar,
    eliminarSeleccionados,
    renderStatus,
  } = useTableTask();

  // const datosTabla = table.getHeaderGroups().map((headerGroup) => headerGroup);

  return (
    <>
      <div className="flex flex-col p-2 md:flex-row items-center justify-between gap-2">
        <fieldset className="fieldset">
          <label className="label">
            <span className="text-base">Filtrar por estatus:</span>
          </label>
          <select
            className="select"
            value={activeFilter}
            onChange={handleStatusFilter}
          >
            <option value="All">Todos</option>
            <option value="Active">Activo</option>
            <option value="Complete">Completado</option>
            <option value="ItWasNot">No se hizo</option>
          </select>
        </fieldset>
        {Object.keys(selectedIds).filter((id) => selectedIds[id]).length >
          0 && (
          <button
            className="btn btn-error"
            onClick={() => eliminarSeleccionados()}
          >
            Eliminar seleccionados (
            {Object.keys(selectedIds).filter((id) => selectedIds[id]).length})
          </button>
        )}
      </div>
      {/* Mensajes condicionales */}
      {displayData.length === 0 ? (
        <div className="alert alert-info my-4">
          <span className="text-xl">
            {v.iconoAdvertencia && <v.iconoAdvertencia />}
          </span>
          <span>No hay tareas que mostrar</span>
        </div>
      ) : (
        <div className="bg-base-100 rounded-lg shadow-md border border-t-4 border-neutral/60">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <TaskTableHeader
                isChecked={isChecked}
                onCheckAll={handleCheckAll}
                flexRender={flexRender}
              />
              <tbody>
                {displayData.map((user) => (
                  <TaskTableRow
                    key={user.id}
                    user={user}
                    selectedIds={selectedIds}
                    onCheckTask={handleCheckTask}
                    onEdit={handleOpenUpdateTask}
                    onDelete={eliminar}
                    renderStatus={renderStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ModalAgregarTareas
        openModaSaveTask={openModaSaveTask}
        setOpenModaSaveTask={setOpenModaSaveTask}
      />

      <ModalEditarTareas
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        openModaUpdateTask={openModaUpdateTask}
        setOpenModaUpdateTask={setOpenModaUpdateTask}
      />
    </>
  );
};
