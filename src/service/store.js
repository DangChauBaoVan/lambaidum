import { configureStore } from '@reduxjs/toolkit'
import bookReducer  from "./books/slice"

const store = configureStore({
    reducer: {
        book: bookReducer
    },
})

export default store