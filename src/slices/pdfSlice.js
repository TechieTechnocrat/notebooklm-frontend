import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadPdfAPI } from '../external/api';

export const uploadPdf = createAsyncThunk(
  'pdf/uploadPdf',
  async (file, { rejectWithValue }) => {
    try {
      const response = await uploadPdfAPI(file);
      return {
        ...response,
        pdfFile: file,
        fileName: file.name
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload PDF');
    }
  }
);

const initialState = {
  pdfFile: null,
  fileName: '',
  isUploaded: false,
  uploadProgress: 0,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  pdfUrl: null,
};

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetPdf: (state) => {
      return { ...initialState };
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUploaded = true;
        state.pdfFile = action.payload.pdfFile;
        state.fileName = action.payload.fileName;
        state.pdfUrl = URL.createObjectURL(action.payload.pdfFile);
        state.uploadProgress = 100;
        state.error = null;
      })
      .addCase(uploadPdf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      });
  },
});

export const { 
  setCurrentPage, 
  setTotalPages, 
  resetPdf, 
  setUploadProgress, 
  clearError 
} = pdfSlice.actions;

export default pdfSlice.reducer;