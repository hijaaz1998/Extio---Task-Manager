import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: ''
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      login: (state, action) => {
         state.user = action.payload
      },
      logput: (state) => {
         state.user = '';
      }
   }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer