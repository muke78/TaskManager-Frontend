import { useCallback, useEffect, useMemo } from 'react';
import { Modal } from './ui/Modal/Modal';
import { useForm } from 'react-hook-form';
import { useTaskQueries } from '../hooks/useTaskQueries';

export const ModalAgregarTareas = ({
  openModaSaveTask,
  setOpenModaSaveTask,
}) => {
  const { createTask } = useTaskQueries();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  // Constantes memoizadas
  const inputErrorText = useMemo(() => 'Este campo es obligatorio', []);

  const onSaveTask = useCallback(
    async (data) => {
      await createTask({
        title: data.nameTask,
        description: data.description,
        icon: data.icon,
        status: data.status,
      });
      reset();
      setOpenModaSaveTask(!openModaSaveTask);
    },
    [createTask, reset, setOpenModaSaveTask, openModaSaveTask]
  );

  useEffect(() => {
    if (openModaSaveTask) {
      setFocus('nameTask'); // Establece el enfoque en el input 'nameTask'
    }
  }, [openModaSaveTask, setFocus]);

  return (
    <div>
      {openModaSaveTask && (
        <Modal
          onClose={() => setOpenModaSaveTask(!openModaSaveTask)}
          title={'Guarda tareas'}
          onSave={handleSubmit(onSaveTask)}
          saveButtonText={'Guardar tarea'}
        >
          <form onSubmit={handleSubmit(onSaveTask)} method="POST">
            <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-4 mt-6">
              <div>
                <label className="label">Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre de la tarea"
                  className="input w-full text-base-content"
                  {...register('nameTask', {
                    required: inputErrorText,
                  })}
                />
                {errors.nameTask && (
                  <p className="text-primary p-0">{errors.nameTask?.message}</p>
                )}
              </div>
              <div>
                <label className="label">Descripcion</label>
                <input
                  type="text"
                  placeholder="Descripcion de la tarea"
                  className="input w-full text-base-content"
                  {...register('description', {
                    required: inputErrorText,
                  })}
                />
                {errors.description && (
                  <p className="text-primary p-0">
                    {errors.description?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">Icono</label>
                <input
                  type="text"
                  placeholder="Icono"
                  className="input w-full text-base-content"
                  {...register('icon', {
                    required: inputErrorText,
                  })}
                />
                {errors.icon && (
                  <p className="text-primary p-0">{errors.icon?.message}</p>
                )}
              </div>
              <div>
                <label className="label">Estatus</label>
                <select
                  className="select w-full"
                  {...register('status', {
                    required: inputErrorText,
                  })}
                >
                  <option disabled={true}>Elije un status</option>
                  <option value="Active">Activa</option>
                  <option value="Complete">Completada</option>
                  <option value="ItWasNot">No completada</option>
                </select>
                {errors.status && (
                  <p className="text-primary p-0">{errors.status?.message}</p>
                )}
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
