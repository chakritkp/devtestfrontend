import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "../api";
import { RootState } from "../store";
import { format, parse, setYear } from 'date-fns';
import { th } from "date-fns/locale";

export interface WaterCourse {
    obstacle_id: number;
    obstacle_type_id: number;
    obstacle_type_name: string;
    title: string;
    start_date: any;
    obstacle_status: number;
    latitude: number;
    longitude: number;
    note: string;
    status: any;
    create_by: string;
    create_date: any;
    update_by: string;
    update_date: any;
    delete_by: string;
    delete_date: any;
    end_date: any;
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
    searchTerm: string;
    selectedTypeID: number;
    startDate: Date | null;
    endDate: Date | null;
}

const initialState: DataState = {
    waterCourseData: [],
    loading: 'idle',
    error: null,
    searchTerm: '',
    selectedTypeID: 0,
    startDate: null,
    endDate: null,
};


export const fetchData = createAsyncThunk<WaterCourse[]>('api', async () => {
    try {
        const response = (await api.get('/obstacle')).data;

        const setFormData = response.map((item: any) => ({
            ...item,
            province_name: item.province_name,
            amphoe_name: item.province_name,
            tambon_name: item.tambon_name,
            mooban_name: item.mooban_name,
            start_date: formattedDate(item.start_date),
            create_date: formattedDate(item.create_date),
            update_date: formattedDate(item.update_date),
            delete_date: formattedDate(item.delete_date),
            end_date: formattedDate(item.end_date),
        }));

        return setFormData;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});

export const formattedDate = (value: string | null) => {
    try {
        if (value !== null) {
            const parsedDate = parse(value, 'dd/MM/yyyy HH:mm', new Date());
            const buddhistYear = parsedDate.getFullYear() + 543;
            const buddhistDate = setYear(parsedDate, buddhistYear);
            const formattedDateResult = format(buddhistDate, 'dd MMMM yyyy HH:mm', { locale: th });
            return formattedDateResult;
        }

    } catch (error) {
        return undefined;
    }
};

export const createData = createAsyncThunk<WaterCourse[], void>('create', async (data) => {
    try {
        const response = await api.post('/obstacle', data)
        return response.data;
    } catch (error) {
        console.error("Error create data:", error);
        throw error;
    }
})

export const deleteData = createAsyncThunk<void, { id: number }>('delete', async (id) => {
    try {
        await api.delete(`/obstacle/${id}`)
    } catch (error) {
        console.error("Error delete data:", error);
    }
})

export const editData = createAsyncThunk<WaterCourse, { id: number, data: WaterCourse }>('edit', async ({ id, data }) => {
    try {
        const response = await api.patch(`/obstacle/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error edit data:", error);
        throw error;
    }
});


export const waterCourseSlice = createSlice({
    name: 'watercourses',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<WaterCourse[]>) => {
            state.waterCourseData = action.payload;

        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSelectedTypeID: (state, action: PayloadAction<number>) => {
            state.selectedTypeID = action.payload
        },
        setStartDate: (state, action: PayloadAction<Date | null>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<Date | null>) => {
            state.endDate = action.payload
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

const isDateInRange = (targetDate: string | null, startDate: Date, endDate: Date) => {
    if (targetDate !== null && targetDate !== undefined) {
        const toArray: string[] = targetDate.split(' ')
        const monthsInThai: any = {
            'มกราคม': '01',
            'กุมภาพันธ์': '02',
            'มีนาคม': '03',
            'เมษายน': '04',
            'พฤษภาคม': '05',
            'มิถุนายน': '06',
            'กรกฎาคม': '07',
            'สิงหาคม': '08',
            'กันยายน': '09',
            'ตุลาคม': '10',
            'พฤศจิกายน': '11',
            'ธันวาคม': '12',
        };

        const monthValue = monthsInThai[toArray[1]];
        if (monthValue) {
            toArray[1] = monthValue;
        }

        const thaiYear = parseInt(toArray[2]) - 543;
        toArray[2] = thaiYear.toString();

        const formattedDate = new Date(`${toArray[2]}-${toArray[1]}-${toArray[0]}T${toArray[3]}`);
        if (isNaN(formattedDate.getTime())) {
            return false;
        }
        return formattedDate >= startDate && formattedDate <= endDate;
    }

    return false;
};

export const { setData, setSearchTerm, setSelectedTypeID, setStartDate, setEndDate } = waterCourseSlice.actions;
export const waterCourseSeletor = (state: RootState) => {
    const { waterCourseData, searchTerm, selectedTypeID, startDate, endDate } = state.waterCourse;

    const filteredData = waterCourseData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTypeID === 0 || item.obstacle_type_id === selectedTypeID) &&
        (startDate === null || endDate === null || isDateInRange(item.start_date, startDate, endDate))
    );

    return filteredData;
};

export default waterCourseSlice.reducer;


