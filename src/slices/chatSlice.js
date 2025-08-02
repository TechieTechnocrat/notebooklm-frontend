import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { askQuestionAPI } from '../external/api';

// Async thunk for asking questions
export const askQuestion = createAsyncThunk(
  'chat/askQuestion',
  async (question, { rejectWithValue }) => {
    try {
      const response = await askQuestionAPI(question);
      return {
        question,
        answer: response.answer,
        citations: response.citations || [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get answer');
    }
  }
);

const initialState = {
  messages: [],
  currentQuestion: '',
  isLoading: false,
  error: null,
  citations: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.citations = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        type: 'user',
        content: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askQuestion.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // Add user message
        state.messages.push({
          id: Date.now(),
          type: 'user',
          content: action.meta.arg,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuestion = '';
        
        // Add AI response
        state.messages.push({
          id: Date.now() + 1,
          type: 'ai',
          content: action.payload.answer,
          citations: action.payload.citations,
          timestamp: action.payload.timestamp,
        });
        
        // Update citations
        if (action.payload.citations) {
          state.citations = [...state.citations, ...action.payload.citations];
        }
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        
        // Add error message
        state.messages.push({
          id: Date.now() + 1,
          type: 'error',
          content: action.payload || 'Failed to get answer',
          timestamp: new Date().toISOString(),
        });
      });
  },
});

export const { 
  setCurrentQuestion, 
  clearMessages, 
  clearError, 
  addUserMessage 
} = chatSlice.actions;

export default chatSlice.reducer;