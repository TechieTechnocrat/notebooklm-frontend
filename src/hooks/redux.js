import { useDispatch, useSelector } from 'react-redux';

// Typed hooks for Redux
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hooks for specific slices
export const usePdf = () => {
  return useAppSelector((state) => state.pdf);
};

export const useChat = () => {
  return useAppSelector((state) => state.chat);
};

export const useUI = () => {
  return useAppSelector((state) => state.ui);
};