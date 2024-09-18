//store authentication track
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}
const authSlice= createSlice({
name:"authReducer",
initialState,
reducers:
{
login:(state,action)=>{
   
    state.status=true;
    state.userData=action.payload.userData;
  
    },
logout:(state)=>
    {
        state.status=false;
        state.userData= null;
    },
  
}
})
export const {login,logout}=authSlice.actions;  //here all reducers are called actions like login,logout,getauth
export default authSlice.reducer;