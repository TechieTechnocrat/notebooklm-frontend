import axios from 'axios';

// Direct API instance - no config file needed
const api = axios.create({
  baseURL: 'https://notebooklm-backend-production-da66.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadPdfAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload-pdf/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const askQuestionAPI = async (question) => {
  // Send question in request body as JSON
  const response = await api.post('/ask/', {
    question: question
  });
  
  return response.data;
};

export const healthCheckAPI = async () => {
  const response = await api.get('/');
  return response.data;
};