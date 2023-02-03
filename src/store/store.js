import { configureStore } from "@reduxjs/toolkit";
import snippetReducer from './snippetSlice'
import activeReducer from './activeSlice'

const store = configureStore({
    reducer: {
        snippets: snippetReducer,
        active: activeReducer
    }
})

export default store