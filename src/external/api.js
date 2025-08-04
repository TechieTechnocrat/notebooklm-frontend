import axios from 'axios';

const api = axios.create({
  baseURL: 'https://notebooklm-backend-production-da66.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadPdfAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const askQuestionAPI = async (question) => {
  const response = await api.post('/ask', {
    question: question
  });
  console.log('Response from askQuestionAPI:', response.data);
  return response.data;
};

