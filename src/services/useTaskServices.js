import { api } from '../config/api';

export const listTask = async () => {
  const response = await api.get('/task');
  return response.data;
};

export const listTaskActiveService = async () => {
  const response = await api.get('/task-progress');
  return response.data;
};

export const listTaskCompleteService = async () => {
  const response = await api.get('/task-complete');
  return response.data;
};

export const listTaskNotCompleteService = async () => {
  const response = await api.get('/task-itWasNot');
  return response.data;
};

export const createNewTaskService = async ({
  title,
  description,
  icon,
  status,
}) => {
  const response = await api.post('/new-task', {
    title,
    description,
    icon,
    status,
  });
  return response.data;
};

export const updateTaskService = async ({
  id,
  title,
  description,
  icon,
  status,
}) => {
  const response = await api.put('/update-task', {
    id,
    title,
    description,
    icon,
    status,
  });
  return response.data;
};

export const deleteTaskService = async ({ id }) => {
  const response = await api.delete(`/delete-task/${id}`);
  return response.data;
};
