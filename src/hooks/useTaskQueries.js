import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  listTask,
  createNewTaskService,
  updateTaskService,
  deleteTaskService,
} from '../services/useTaskServices';

export const useTaskQueries = (activeFilter) => {
  const queryClient = useQueryClient();

  // Obtener todas las tareas con filtro
  const { data, isLoading, error } = useQuery({
    queryKey: ['task', activeFilter],
    queryFn: () => listTask(activeFilter),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!activeFilter, // opcional si puede ser null al inicio
    onError: (error) => {
      console.error(error); // Asegúrate de loguear el error para depurar
    },
    onSuccess: (data) => {
      if (!data) {
        return []; // Evitar que la data sea undefined
      }
    },
  });

  // Crear una nueva tarea
  const createTaskMutation = useMutation({
    mutationFn: (taskData) => createNewTaskService(taskData),
    onSuccess: (_, variables) => {
      // Agregar el estado global a zustand
      console.log('Invalidando query post...');
      queryClient.invalidateQueries({ queryKey: ['task'], exact: false });
      toast.success(`Se creo correctamente la tarea ${variables.title}`, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || 'Ocurrió un error',
        { duration: 5000 }
      );
    },
  });

  // Actualiza una tarea
  const updateTaskMutation = useMutation({
    mutationFn: (taskEditData) => updateTaskService(taskEditData),
    onSuccess: (_, variables) => {
      // Agregar el estado a zustand
      console.log('Invalidando query put...');
      queryClient.invalidateQueries({ queryKey: ['task'], exact: false });
      toast.success(`Se edito correctamente la tarea ${variables.title}`, {
        duration: 5000,
      });
    },
  });

  // Eliminar una tarea

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => deleteTaskService(id),
    onSuccess: (data) => {
      // Agregar el estado a zustand
      queryClient.invalidateQueries({ queryKey: ['task'], exact: false });
      toast.success(data.message, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || 'Ocurrió un error',
        {
          duration: 5000,
        }
      );
    },
  });

  return {
    data,
    isLoading,
    error,
    createTaskAsync: createTaskMutation.mutateAsync,
    updateTaskAsync: updateTaskMutation.mutateAsync,
    deleteTaskAsync: deleteTaskMutation.mutateAsync,
  };
};
