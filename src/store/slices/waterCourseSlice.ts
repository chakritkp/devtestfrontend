import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "../api";
import { RootState } from "../store";

export interface WaterCourse {
    obstacle_id: number;
    obstacle_type_id: number;
    title: string;
    start_date: Date;
    obstacle_status: number;
    latitude: number;
    longitude: number;
    note: string;
    status: number;
    create_by: string;
    create_date: Date;
    update_by: string;
    update_date: Date;
    delete_by: string;
    delete_date: Date;
    end_date: Date;
    province_name: string;
    amphoe_name: string;
    tambon_name: string;
    mooban_name: string;
    province_code: number;
    amphoe_code: number;
    tambon_code: number;
    mooban_code: number;
}

export interface DataState {
    waterCourseData: WaterCourse[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DataState = {
    waterCourseData: [],
    loading: 'idle',
    error: null,
};

export const fetchData = createAsyncThunk<WaterCourse[], void>('api', async () => {
    try {
        const response = await api.get('/obstacle')
        return response.data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});

export const createData = createAsyncThunk<WaterCourse[], void>('create', async (data) => {
    try {
        console.log(data)
        const response = await api.post('/obstacle', data)
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error create data:", error);
        throw error;
    }
})

export const waterCourseSlice = createSlice({
    name: 'watercourses',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<WaterCourse[]>) => {
            state.waterCourseData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.waterCourseData = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(createData.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(createData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || null;
            });
    }
})

export const { setData } = waterCourseSlice.actions;
export const waterCourseSeletor = (state: RootState) => state.waterCourse;

export default waterCourseSlice.reducer;