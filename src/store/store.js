//want to know about all reducers
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'

const store = configureStore({
    reducer:
    {
        authReducer, //its authslice update above in import authslice as authreducer if require
       
       }
});
export default store;
