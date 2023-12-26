import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchLogin = createAsyncThunk('fetchLogin', async (loginDetails) => {
    const request = await axios.post('http://139.59.58.151:8000/adminlogin', loginDetails);
    const response = await request.data;
    console.log("response", response);
    // if (response.success === 'true') {
    //     // Store the token in AsyncStorage
    //     localStorage.setItem("token", response.token);
     return response;
    //   } else {
    //     throw new Error('Login Failed');
    //   }
})

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        token: null,
        success: false,
        isError: false
    },
    reducers: {
        
        logOut(state, action) {
            localStorage.removeItem("token");
            state.token = null
        }
       
    },

})
export const {  logOut } = LoginSlice.actions;
export default LoginSlice.reducer;
