import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface ThailandDatabase {
    district: string
    amphoe: string
    province: string
    zipcode: number
    district_code: number
    amphoe_code: number
    province_code: number
}

export interface DataState {
    thailandData: ThailandDatabase[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DataState = {
    thailandData: [],
    loading: 'idle',
    error: null,
};

export const thailandDatabaseSlice = createSlice({
    name: 'thailanddatabase',
    initialState,
    reducers: {
        setThailandDatabase: (state, action: PayloadAction<ThailandDatabase[]>) => {
            state.thailandData = action.payload
        }
    },
})

export const { setThailandDatabase } = thailandDatabaseSlice.actions;
export const thailandDataSeletor = (state: RootState) => state.thailandDatabase;

export default thailandDatabaseSlice.reducer