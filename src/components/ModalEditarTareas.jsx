import React, { useCallback, useEffect } from 'react';
import { useTaskQueries } from '../hooks/useTaskQueries';
import { Modal } from './ui/Modal/Modal';
import { useForm } from 'react-hook-form';

export const ModalEditarTareas = ({
  selectedUser,
  setSelectedUser,
  openModaUpdateTask,
  setOpenModaUpdateTask,
}) => {
  const { updateTask } = useTaskQueries();
  const { setFocus } = useForm();

  const handleUpdateTask = useCallback(async () => {
    await updateTask({
      id: selectedUser.id,
      title: selectedUser.title,
      description: selectedUser.description,
      icon: selectedUser.icon,
      status: selectedUser.status,
    });
    setOpenModaUpdateTask(!openModaUpdateTask);
  }, [
    selectedUser.id,
    selectedUser.title,
    selectedUser.description,
    selectedUser.icon,
    selectedUser.status,
    setOpenModaUpdateTask,
    openModaUpdateTask,
    updateTask,
  ]);

  useEffect(() => {
    if (openModaUpdateTask) {
      setFocus(selectedUser.title);
    }
  }, [openModaUpdateTask, setFocus, selectedUser.title]);

  return (
    <div>
      {openModaUpdateTask && (
        <Modal
          onClose={() => setOpenModaUpdateTask(false)}
          title="Editar tarea"
          onSave={handleUpdateTask}
          saveButtonText="Guardar cambios"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            {/* Nombre */}
            <div>
              <label className="label">Nombre</label>
              <input
                type="text"
                className="input w-full text-base-content"
                value={selectedUser.title}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, title: e.target.value })
                }
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="label">Descripción</label>
              <input
                type="text"
                className="input w-full text-base-content"
                value={selectedUser.description}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    description: e.target.value,
                  })
                }
              ></input>
            </div>

            {/* Icono */}
            <div>
              <label className="label">Icono</label>
              <input
                type="text"
                className="input w-full text-base-content"
                value={selectedUser.icon}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, icon: e.target.value })
                }
                placeholder="fa-check-circle"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="label">Estatus</label>
              <select
                className="select w-full"
                value={selectedUser.status}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, status: e.target.value })
                }
              >
                <option disabled value="">
                  Elije un status
                </option>
                <option value="Active">Activa</option>
                <option value="Complete">Completada</option>
                <option value="ItWasNot">No completada</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
