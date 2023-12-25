import { configureStore } from '@reduxjs/toolkit';
import waterCourseReducer from './slices/waterCourseSlice';
import thailandDatabaseReducer from './slices/thailandDatabaseSlice';
import { useDispatch } from 'react-redux';
import waterCoursefindReducer from './slices/waterCoursefindSlice';

export const store = configureStore({
  reducer: {
    waterCourse: waterCourseReducer,
    thailandDatabase: thailandDatabaseReducer,
    waterCoursefind: waterCoursefindReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
