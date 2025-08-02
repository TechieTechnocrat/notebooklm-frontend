# NotebookLM Clone - Frontend

A React-based frontend application that mimics Google NotebookLM functionality, allowing users to upload PDF documents and interact with them through an AI-powered chat interface.

## Features

- **PDF Upload**: Drag and drop or click to upload PDF documents
- **PDF Viewer**: Built-in PDF viewer with zoom, rotation, and navigation controls
- **Chat Interface**: Interactive chat with AI about the uploaded PDF content
- **Citations**: Clickable citations that navigate to specific PDF pages
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes
- **Redux State Management**: Centralized state management with Redux Toolkit

## Tech Stack

- **React 18** - Frontend framework
- **Redux Toolkit** - State management
- **React-PDF** - PDF viewing and rendering
- **SCSS** - Styling
- **Lucide React** - Icons
- **React Dropzone** - File upload handling
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/
│   ├── UploadScreen
│   ├── MainInterface
│   ├── Header
│   ├── Sidebar
│   ├── PdfViewer
│   ├── ChatInterface
│   ├── MessageBubble
│   ├── CitationButton
│   ├── NotificationContainer
    └── ProgressBar
├── store
│   ├── store.js
│   └── slices/
│       ├── pdfSlice.js
│       ├── chatSlice.js
│       └── uiSlice.js
├── external/
│   └── api.js
├── hooks/
│   └── redux.js
├── styles/
│   └── main.scss
├── App.jsx
└── index.js


## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API endpoint**:
   - The app reads API configuration from `public/config.json`
   - For local development, it's set to `http://127.0.0.1:8000`
   - For deployment, update the `api_endpoint` in this file

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Configuration

### API Endpoint Configuration

The application uses a configuration file located at `public/config.json`:

```json
{
  "api_endpoint": "http://127.0.0.1:8000"
}
```

**For Local Development:**
- Keep the endpoint as `http://127.0.0.1:8000` (or your backend URL)

**For Deployment:**
- Update the `api_endpoint` to your deployed backend URL
- Example: `"https://your-backend-url.ngrok.io"` or your production API URL

### Environment Setup

1. **Local Development**:
   - Ensure your backend is running on port 8000
   - The frontend will run on port 3000 by default

2. **Deployment**:
   - Build the app: `npm run build`
   - Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)
   - Update `public/config.json` with your production API endpoint

## Backend API Requirements

The frontend expects the following API endpoints:

### POST `/upload-pdf/`
- **Purpose**: Upload PDF file
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with `file` field containing the PDF
- **Response**: 
  ```json
  {
    "message": "PDF uploaded successfully",
    "filename": "document.pdf"
  }
  ```

### POST `/ask/`
- **Purpose**: Ask questions about the uploaded PDF
- **Content-Type**: `application/json`
- **Body**: 
  ```json
  {
    "question": "What is this document about?"
  }
  ```
- **Response**: 
  ```json
  {
    "answer": "This document is about...",
    "citations": [
      {
        "page": 1,
        "text": "relevant text excerpt",
        "context": "additional context"
      }
    ]
  }
  ```

### GET `/`
- **Purpose**: Health check
- **Response**: Basic API status

## Features Overview

### 1. PDF Upload Screen
- Drag and drop interface
- File validation (PDF only)
- Upload progress indicator
- Success/error feedback

### 2. Main Interface
- Split-panel layout (PDF viewer + Chat)
- Responsive design that adapts to different screen sizes
- Collapsible sidebar for navigation

### 3. PDF Viewer
- Page navigation (previous/next, direct page input)
- Zoom controls (25% to 300%)
- Rotation functionality
- Download option
- Text selection and search capabilities

### 4. Chat Interface
- Real-time messaging with AI
- Suggested questions for new users
- Citation support with page navigation
- Message history
- Loading states and error handling

### 5. Additional Features
- **Notifications**: Toast notifications for user feedback
- **Theme Toggle**: Dark/light mode support
- **Responsive Design**: Mobile-friendly interface
- **Sidebar**: Document info and chat history
- **State Persistence**: Redux-based state management

## Usage

1. **Upload a PDF**: Start by uploading a PDF document using the drag-and-drop interface
2. **View PDF**: Use the PDF viewer controls to navigate, zoom, and rotate pages
3. **Ask Questions**: Use the chat interface to ask questions about the PDF content
4. **Navigate via Citations**: Click on citation buttons in AI responses to jump to specific PDF pages
5. **Manage Sessions**: Use the sidebar to see recent questions and start new document sessions

## Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Update configuration**:
   - Modify `public/config.json` with your backend API URL
   - Example: `{"api_endpoint": "https://your-api.ngrok.io"}`

3. **Deploy**:
   - Upload the `build` folder to your hosting service
   - Or connect your repository for automatic deployments

### Backend Considerations

- Ensure your backend API supports CORS for your frontend domain
- The backend should handle file uploads and provide the expected response format
- Consider rate limiting and file size restrictions for production

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Considerations

- PDF rendering is optimized for large documents
- Lazy loading for better performance
- Efficient state management with Redux Toolkit
- Responsive images and adaptive layouts

## Contributing

1. Follow the established component structure
2. Use SCSS for styling with the established design system
3. Implement proper error handling and loading states
4. Write descriptive commit messages
5. Test on multiple devices and browsers

## Troubleshooting

### Common Issues

1. **PDF not loading**: Ensure the PDF file is valid and not corrupted
2. **API connection issues**: Check the `config.json` file and network connectivity
3. **Build errors**: Clear node_modules and reinstall dependencies
4. **Performance issues**: Check console for errors and optimize component re-renders

### Debug Mode

Enable React Developer Tools and Redux DevTools for debugging:
- Install browser extensions for React and Redux DevTools
- Check network tab for API call issues
- Monitor Redux state changes

## License

This project is for educational/assignment purposes.