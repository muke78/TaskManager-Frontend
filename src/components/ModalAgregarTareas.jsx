import { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from './ui/Modal/Modal';
import { useForm } from 'react-hook-form';
import { useTaskQueries } from '../hooks/useTaskQueries';
import EmojiPicker from 'emoji-picker-react';
import { createPortal } from 'react-dom';

export const ModalAgregarTareas = ({
  openModaSaveTask,
  setOpenModaSaveTask,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiselect, setEmojiselect] = useState('😊');

  const { createTaskAsync } = useTaskQueries();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm();

  // Constantes memoizadas
  const inputErrorText = useMemo(() => 'Este campo es obligatorio', []);

  const onSaveTask = useCallback(
    async (data) => {
      await createTaskAsync({
        title: data.nameTask,
        description: data.description,
        icon: data.icon,
        status: data.status,
      });
      reset();
      setOpenModaSaveTask(false);
    },
    [createTaskAsync, reset, setOpenModaSaveTask]
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
                  className="input w-full text-base-content outline-none border-0 border-b-4"
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
                  className="input w-full text-base-content outline-none border-0 border-b-4"
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
              <div className="relative">
                <label className="label">Icono</label>
                <div className="flex">
                  <input
                    className="input outline-none border-0 border-b-4 background-transparent text-2xl cursor-pointer"
                    readOnly={true}
                    value={emojiselect}
                    type="text"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    {...register('icon', {
                      required: inputErrorText,
                    })}
                  />
                </div>

                {showEmojiPicker &&
                  createPortal(
                    <div
                      style={{
                        position: 'absolute',
                        translate: '0 -50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                      }}
                    >
                      <EmojiPicker
                        emojiStyle="apple"
                        theme="dark"
                        autoFocusSearch={true}
                        onEmojiClick={(emojiData) => {
                          setValue('icon', emojiData.emoji);
                          setEmojiselect(emojiData.emoji);
                          setShowEmojiPicker(false);
                        }}
                      />
                    </div>,
                    document.body
                  )}

                {errors.icon && (
                  <p className="text-primary p-0">{errors.icon?.message}</p>
                )}
              </div>
              <div>
                <label className="label">Estatus</label>
                <select
                  className="select w-full outline-none border-0 border-b-4"
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
