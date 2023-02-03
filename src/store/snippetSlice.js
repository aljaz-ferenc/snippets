import {createSlice} from '@reduxjs/toolkit'


const snippetSlice = createSlice({
    name: 'snippets',
    initialState: {snippets: null},
    reducers: {
        saveSnippets(state, action){
            state.snippets = action.payload
        }
    }
})

export default snippetSlice.reducer
export const snippetActions = snippetSlice.actions