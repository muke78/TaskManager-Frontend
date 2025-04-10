import React, { useCallback, useEffect, useState } from 'react';
import { useTaskQueries } from '../hooks/useTaskQueries';
import { v } from '../styles/variables';
import { ModalAgregarTareas } from './ModalAgregarTareas';
import { ModalEditarTareas } from './ModalEditarTareas';
import Swal from 'sweetalert2';

export const TableTask = ({ openModaSaveTask, setOpenModaSaveTask }) => {
  // Importamos los hooks de las tareas por medio de nuestros queries y nuestras mutaciones
  const [openModaUpdateTask, setOpenModaUpdateTask] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayData, setDisplayData] = useState([]);
  const [isCurrentlyLoading, setIsCurrentlyLoading] = useState(true);
  const [currentError, setCurrentError] = useState(null);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  const { data, isLoading, error, deleteTaskAsync } =
    useTaskQueries(activeFilter);

  useEffect(() => {
    if (data && data.length > 0) {
      setDisplayData(data);
    }

    if (!data || data.length === 0) {
      setDisplayData([]); // opcional: limpiar si no hay datos
    }
    setIsCurrentlyLoading(isLoading);
    setCurrentError(error);
    setActiveFilter(activeFilter);
  }, [data, isLoading, error, activeFilter]);

  // Callback para abrir modal de edición
  const handleOpenUpdateTask = useCallback((user) => {
    setSelectedUser(user);
    setOpenModaUpdateTask(true);
  }, []);

  // Callback para eliminar usuario con confirmación
  const eliminar = useCallback(
    (p) => {
      Swal.fire({
        title: '¿Estás seguro(a)?',
        text: 'Una vez eliminado, ¡no podrá recuperar este registro!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        theme: 'dark',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteTaskAsync({ id: p });
        }
      });
    },
    [deleteTaskAsync]
  );

  // Renderizar el estado con el formato correcto
  const renderStatus = useCallback((status) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-soft badge-info">Activa</span>;
      case 'Complete':
        return (
          <span className="badge badge-soft badge-success">Completada</span>
        );
      default:
        return <span className="badge badge-soft badge-error">No hechas</span>;
    }
  }, []);

  return (
    <>
      <div className="dropdown dropdown-right mb-4">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-neutral"
          onClick={() => setOpenFilterMenu(!openFilterMenu)}
        >
          Filtro de estatus {v.iconoFiltro && <v.iconoFiltro />}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content flex flex-row text-nowrap gap-2 ml-4"
        >
          <li>
            <button
              className={`btn text-lg ${
                activeFilter === 'All' ? 'btn-neutral' : 'btn-outline'
              }`}
              onClick={() => setActiveFilter('All')}
            >
              {v.iconoTodasLasTareas && <v.iconoTodasLasTareas />}
              <span className="text-base">Todas</span>
            </button>
          </li>
          <li>
            <button
              className={`btn text-lg ${
                activeFilter === 'Active' ? 'btn-info' : 'btn-soft btn-info'
              }`}
              onClick={() => setActiveFilter('Active')}
            >
              {v.iconoActivas && <v.iconoActivas />}
              <span className="text-base">Activas</span>
            </button>
          </li>
          <li>
            <button
              className={`btn text-lg ${
                activeFilter === 'Complete'
                  ? 'btn-success'
                  : 'btn-soft btn-success'
              }`}
              onClick={() => setActiveFilter('Complete')}
            >
              {v.iconoCompletadas && <v.iconoCompletadas />}
              <span className="text-base">Completadas</span>
            </button>
          </li>
          <li>
            <button
              className={`btn text-lg ${
                activeFilter === 'ItWasNot' ? 'btn-error' : 'btn-soft btn-error'
              }`}
              onClick={() => setActiveFilter('ItWasNot')}
            >
              {v.iconoNoCompletadas && <v.iconoNoCompletadas />}
              <span className="text-base">No hechas</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mensajes condicionales */}
      {displayData.length === 0 && (
        <div className="alert alert-info my-4">
          <span className="text-xl">
            {v.iconoAdvertencia && <v.iconoAdvertencia />}
          </span>
          <span>No hay tareas que mostrar</span>
        </div>
      )}

      {/* Tabla con scroll horizontal */}
      {!isCurrentlyLoading && !currentError && displayData.length > 0 && (
        <div className="bg-base-100 rounded-lg shadow-md border border-t-4 border-neutral/60">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Icon</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {displayData.length > 0 ? (
                  displayData.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap">
                        {user.id.slice(0, 6)}
                      </td>
                      <td className="whitespace-nowrap">{user.title}</td>
                      <td className="max-w-xs">{user.description}</td>
                      <td className="text-center text-lg">{user.icon}</td>
                      <td className="whitespace-nowrap">
                        {renderStatus(user.Status)}
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="flex flex-row gap-2">
                          <button
                            className="btn btn-soft btn-info"
                            aria-label="Editar tarea"
                            onClick={() =>
                              handleOpenUpdateTask({
                                id: user.id,
                                title: user.title,
                                description: user.description,
                                icon: user.icon,
                                status: user.Status,
                              })
                            }
                          >
                            {v.iconoEditar && <v.iconoEditar />}
                          </button>
                          <button
                            className="btn btn-soft btn-error"
                            aria-label="Eliminar tarea"
                            onClick={() => eliminar(user.id)}
                          >
                            {v.iconoBasura && <v.iconoBasura />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8">
                      No hay tareas que mostrar con el filtro seleccionado
                    </td>
                  </tr>
                )}
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
