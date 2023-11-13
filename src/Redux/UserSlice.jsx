import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    userinfo:{},
}

const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.userinfo =action.payload.userinfo
        }
    }
})

export const {setUserInfo} =UserSlice.actions;
export default UserSlice.reducer;