import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  listTask,
  // listTaskActiveService,
  // listTaskCompleteService,
  // listTaskNotCompleteService,
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
    staleTime: 1000 * 60,
    retry: 2,
  });

  // Obtener las tareas que esten activas
  // const { dataActive, isLoadingActive, errorActive } = useQuery({
  //   queryKey: ['task'],
  //   queryFn: listTaskActiveService,
  //   staleTime: 1000 * 60,
  //   retry: 2,
  // });

  // Obtener las tareas que esten completadas
  // const { dataComplete, isLoadingComplete, errorComplete } = useQuery({
  //   queryKey: ['task'],
  //   queryFn: listTaskCompleteService,
  //   staleTime: 1000 * 60,
  //   retry: 2,
  // });

  // Obtener las tareas que no esten completadas
  // const { dataNotComplete, isLoadingNotComplete, errorNotComplete } = useQuery({
  //   queryKey: ['task'],
  //   queryFn: listTaskNotCompleteService,
  //   staleTime: 1000 * 60,
  //   retry: 2,
  // });

  // Crear una nueva tarea
  const createTaskMutation = useMutation({
    mutationFn: (taskData) => createNewTaskService(taskData),
    onSuccess: (_, variables) => {
      // Agregar el estado global a zustand
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toast.success(`Se creo correctamente la tarea ${variables.title}`, {
        duration: 5000,
      });
    },
  });

  // Actualiza una tarea
  const updateTaskMutation = useMutation({
    mutationFn: (taskEditData) => {
      updateTaskService(taskEditData);
      console.log(taskEditData);
    },

    onSuccess: (_, variables) => {
      // Agregar el estado a zustand
      queryClient.invalidateQueries({ queryKey: ['task'] });
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
    // dataActive,
    // dataComplete,
    // dataNotComplete,
    // isLoadingActive,
    // isLoadingComplete,
    // isLoadingNotComplete,
    // errorActive,
    // errorComplete,
    // errorNotComplete,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
