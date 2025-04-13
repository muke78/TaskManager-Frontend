import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  listTask,
  createNewTaskService,
  updateTaskService,
  deleteTaskService,
  deleteTaskBulkService,
} from "../services/useTaskServices";
import { useTaskStore } from "../store/taskStore";

export const useTaskQueries = (activeFilter) => {
  const queryClient = useQueryClient();
  const { setTasks, addTask, updateTask, removeTask } = useTaskStore();

  // Obtener todas las tareas con filtro
  const { data, isLoading, error } = useQuery({
    queryKey: ["task", activeFilter],
    queryFn: () => listTask(activeFilter),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!activeFilter,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      if (data) {
        setTasks(data);
      }
    },
  });

  // Crear una nueva tarea
  const createTaskMutation = useMutation({
    mutationFn: (taskData) => createNewTaskService(taskData),
    onSuccess: (_, variables) => {
      addTask(variables);
      queryClient.invalidateQueries({ queryKey: ["task"], exact: false });
      toast.success(`Se creo correctamente la tarea ${variables.title}`, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Ocurrió un error",
        { duration: 5000 }
      );
    },
  });

  // Actualiza una tarea
  const updateTaskMutation = useMutation({
    mutationFn: (taskEditData) => updateTaskService(taskEditData),
    onSuccess: (_, variables) => {
      updateTask(variables.id, variables);
      queryClient.invalidateQueries({ queryKey: ["task"], exact: false });
      toast.success(`Se edito correctamente la tarea ${variables.title}`, {
        duration: 5000,
      });
    },
  });

  // Eliminar una tarea
  const deleteTaskMutation = useMutation({
    mutationFn: (id) => deleteTaskService(id),
    onSuccess: (data, id) => {
      removeTask(id);
      queryClient.invalidateQueries({ queryKey: ["task"], exact: false });
      toast.success(data.message, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Ocurrió un error",
        {
          duration: 5000,
        }
      );
    },
  });

  const deleteTaskBulkMutation = useMutation({
    mutationFn: (ids) => deleteTaskBulkService(ids),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task"], exact: false });
      toast.success(data.message , {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Ocurrió un error",
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
    deleteTaskBulkAsync: deleteTaskBulkMutation.mutateAsync,
  };
};
