import { configureStore } from '@reduxjs/toolkit';
import  waterCourseReducer from './slices/waterCourseSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    waterCourse: waterCourseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
