import { api } from './api';
import {
  CreateAutomationParams,
  ListAutomationParams,
  DeleteAutomationParams,
  GetAutomationParams,
  UpdateAutomationParams,
} from './types';

export const create = async ({
  onSuccess,
  onError,
  data,
}: CreateAutomationParams): Promise<any> => {
  try {
    const automation = await api.post('/automations/create', data);
    onSuccess(automation);
  } catch (error) {
    onError(error);
  }
};

export const list = async ({ onSuccess, onError }: ListAutomationParams) => {
  try {
    const { data } = await api.get('/automations/list');
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const remove = async ({ id, onSuccess, onError }: DeleteAutomationParams) => {
  try {
    await api.delete(`/automations/${id}/remove`);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const getAutomation = async ({ id, onSuccess, onError }: GetAutomationParams) => {
  try {
    const { data } = await api.get(`/automations/${id}/show`);
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const updateAutomation = async ({
  id, data, onSuccess, onError,
}: UpdateAutomationParams) => {
  try {
    const updatedAutomation = await api.put(`/automations/${id}/update`, data);
    onSuccess(updatedAutomation);
  } catch (error) {
    onError(error);
  }
};
