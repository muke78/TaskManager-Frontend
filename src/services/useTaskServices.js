import { api } from '../config/api';

export const listTask = async (status = 'All') => {
  try {
    const response = await api.get(`/task/${status}`);
    return response.data || [];
  } catch (error) {
    console.error('Ocurrio un error get', error);
    return [];
  }
};

export const createNewTaskService = async ({
  title,
  description,
  icon,
  status,
}) => {
  try {
    const response = await api.post('/new-task', {
      title,
      description,
      icon,
      status,
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrio un error post', error);
  }
};

export const updateTaskService = async ({
  id,
  title,
  description,
  icon,
  status,
}) => {
  try {
    const response = await api.put('/update-task', {
      id,
      title,
      description,
      icon,
      status,
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrio un error put', error);
  }
};

export const deleteTaskService = async ({ id }) => {
  try {
    const response = await api.delete(`/delete-task/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ocurrio un error delete', error);
  }
};
