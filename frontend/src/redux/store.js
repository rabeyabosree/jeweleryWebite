import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer'
import orderReducer from './reducers/orderReducer'
import blogReducer from './reducers/blogReducer'


const store = configureStore({
    reducer: {
        "products": productReducer,
        "auth": authReducer,
        "cart": cartReducer,
        "orders": orderReducer,
        "blogs": blogReducer


    }
})

export default store