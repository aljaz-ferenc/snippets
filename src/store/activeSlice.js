import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
    name: 'active',
    initialState: {active: null},
    reducers: {
        setActive(state, action){
            state.active = action.payload
        }
    }
})

export default activeSlice.reducer
export const activeActions =  activeSlice.actions