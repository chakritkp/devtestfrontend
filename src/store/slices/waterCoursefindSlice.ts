import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api";
import { RootState } from "../store";
import { WaterCourse } from "./waterCourseSlice";


export interface SingleDataState {
    singleWaterCourseData: WaterCourse | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SingleDataState = {
    singleWaterCourseData: null,
    loading: 'idle',
    error: null
}

export const fetchSelectData = createAsyncThunk<WaterCourse, string>('findOne', async (id: string) => {
    try {
        const response = (await api.get(`/obstacle/${id}`)).data;

        return {
            ...response,
            start_date: response.start_date,
            create_date: response.create_date,
            update_date: response.update_date,
            delete_date: response.delete_date,
            end_date: response.end_date,
        };
    
    } catch (error) {
        console.error("Error data not found:", error);
        throw error;
    }
})

export const waterCoursefindSlice = createSlice({
    name: 'singledatastate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSelectData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchSelectData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleWaterCourseData = action.payload;
            })
            .addCase(fetchSelectData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || null
            })
    }

})

export const {  } = waterCoursefindSlice.actions;
export const waterCoursefindSeletor = (state: RootState) => state.waterCoursefind.singleWaterCourseData;

export default waterCoursefindSlice.reducer;