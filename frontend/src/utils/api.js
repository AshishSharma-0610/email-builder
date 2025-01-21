import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const getTemplates = () => api.get('/templates');
export const getTemplate = (id) => api.get(`/templates/${id}`);
export const createTemplate = (data) => api.post('/uploadEmailConfig', data);
export const updateTemplate = (id, data) => api.put(`/templates/${id}`, data);
export const deleteTemplate = (id) => api.delete(`/templates/${id}`);
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/uploadImage', formData);
};
export const renderTemplate = (templateId, data) =>
    api.post('/renderAndDownloadTemplate', { templateId, data });

