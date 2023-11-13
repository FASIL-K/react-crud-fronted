import {persistStore,persistReducer} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import UserSlice from './UserSlice';


const persistConfig = {
    key:'root',
    storage,
};

const PersistReducer = persistReducer(persistConfig,UserSlice);

const Store =  configureStore({
    reducer:{
        user:PersistReducer,
    },
});

const Persistore= persistStore(Store);

export {Store,Persistore}