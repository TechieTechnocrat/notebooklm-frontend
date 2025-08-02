import axios from 'axios';

const getApiEndpoint = async () => {
  try {
    const response = await fetch('/config.json');
    const config = await response.json();
    return config.api_endpoint;
  } catch (error) {
    console.error('Failed to load config:', error);
    return 'http://127.0.0.1:8000'; 
  }
};

const createApiInstance = async () => {
  const baseURL = await getApiEndpoint();
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const uploadPdfAPI = async (file) => {
  const api = await createApiInstance();
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
  const api = await createApiInstance();
  const response = await api.post('/ask/', {
    question: question,
  });
  
  return response.data;
};

export const healthCheckAPI = async () => {
  const api = await createApiInstance();
  const response = await api.get('/');
  return response.data;
};