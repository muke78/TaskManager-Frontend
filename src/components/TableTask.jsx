import React, { useCallback, useState } from 'react';
import { useTaskQueries } from '../hooks/useTaskQueries';
import { v } from '../styles/variables';
import { ModalAgregarTareas } from './ModalAgregarTareas';
import { ModalEditarTareas } from './ModalEditarTareas';
import Swal from 'sweetalert2';

export const TableTask = () => {
  const { data, isLoading, error, deleteTask } = useTaskQueries();
  const [openModaSaveTask, setOpenModaSaveTask] = useState(false);
  const [openModaUpdateTask, setOpenModaUpdateTask] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

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
          await deleteTask({id: p});
        }
      });
    },
    [deleteTask]
  );

  if (isLoading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error al cargar tareas: {error.message}</p>;
  return (
    <>
      <div className="flex flex-col w-7xl gap-10 overflow-x-auto rounded-md border-b-4 border-neutral bg-base-100 shadow-sm">
        <button
          className="btn btn-warning w-1/6"
          onClick={() => setOpenModaSaveTask(!openModaSaveTask)}
        >
          Nueva tarea
          <span className="text-xl">
            {v.iconoAgregar && <v.iconoAgregar />}
          </span>
        </button>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Icon</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((user) => (
              <tr key={user.id}>
                <td>{user.id.slice(0, 6)}</td>
                <td>{user.title}</td>
                <td>{user.description}</td>
                <td>{user.icon}</td>
                <td>
                  {user.Status === 'Active' ? (
                    <span className="badge badge-info">Active</span>
                  ) : user.Status === 'Complete' ? (
                    <span className="badge badge-success">Complete</span>
                  ) : (
                    <span className="badge badge-error">ItWasNot</span>
                  )}
                </td>
                <td>
                  <div className="flex flex-row gap-4">
                    <button
                      className="btn btn-soft btn-info"
                      aria-label="Boton para editar una tarea"
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
                      aria-label="Boton para eliminar una tareaf"
                      onClick={() => eliminar(user.id)}
                    >
                      {v.iconoBasura && <v.iconoBasura />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
