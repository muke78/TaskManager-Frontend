import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  listTask,
  listTaskActiveService,
  listTaskCompleteService,
  listTaskNotCompleteService,
  createNewTaskService,
  updateTaskService,
  deleteTaskService,
} from '../services/useTaskServices';

export const useTaskQueries = () => {
  const queryClient = useQueryClient();

  // Obtener todas las tareas
  const { data, isLoading, error } = useQuery({
    queryKey: ['task'],
    queryFn: listTask,
  });

  // Obtener las tareas que esten activas
  const {
    data: dataActive,
    isLoadingActive,
    errorActive,
  } = useQuery({
    queryKey: ['taskActive'],
    queryFn: listTaskActiveService,
  });

  // Obtener las tareas que esten completadas
  const {
    data: dataComplete,
    isLoadingComplete,
    errorComplete,
  } = useQuery({
    queryKey: ['taskComplete'],
    queryFn: listTaskCompleteService,
  });

  // Obtener las tareas que no esten completadas
  const {
    data: dataNotComplete,
    isLoadingNotComplete,
    errorNotComplete,
  } = useQuery({
    queryKey: ['taskNotComplete'],
    queryFn: listTaskNotCompleteService,
  });

  // Crear una nueva tarea
  const createTaskMutation = useMutation({
    mutationFn: (taskData) => createNewTaskService(taskData),
    onSuccess: (_, variables) => {
      // Agregar el estado global a zustand
      queryClient.invalidateQueries({ queryKey: ['task'] });
      queryClient.invalidateQueries({ queryKey: ['taskActive'] });
      queryClient.invalidateQueries({ queryKey: ['taskComplete'] });
      queryClient.invalidateQueries({ queryKey: ['taskNotComplete'] });

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
    mutationFn: (taskEditData) => {
      updateTaskService(taskEditData);
    },

    onSuccess: (_, variables) => {
      // Agregar el estado a zustand
      queryClient.invalidateQueries({ queryKey: ['task'] });
      queryClient.invalidateQueries({ queryKey: ['taskActive'] });
      queryClient.invalidateQueries({ queryKey: ['taskComplete'] });
      queryClient.invalidateQueries({ queryKey: ['taskNotComplete'] });
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
      queryClient.invalidateQueries({ queryKey: ['task'] });
      queryClient.invalidateQueries({ queryKey: ['taskActive'] });
      queryClient.invalidateQueries({ queryKey: ['taskComplete'] });
      queryClient.invalidateQueries({ queryKey: ['taskNotComplete'] });
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
    dataActive,
    dataComplete,
    dataNotComplete,
    isLoadingActive,
    isLoadingComplete,
    isLoadingNotComplete,
    errorActive,
    errorComplete,
    errorNotComplete,
    createTaskAsync: createTaskMutation.mutateAsync,
    updateTaskAsync: updateTaskMutation.mutateAsync,
    deleteTaskAsync: deleteTaskMutation.mutateAsync,
  };
};
