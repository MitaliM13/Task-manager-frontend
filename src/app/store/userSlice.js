import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUsers: (state, action) => {
            const {name, email, token} = action.payload
            state.name = name;
            state.email = email;
            state.token = token

            if(typeof window !== 'undefined'){
                localStorage.setItem('user', JSON.stringify({name,email, token}))
            }
        },
        clearUser: (state) => {
            state.name = null;
            state.email = null;
            state.token = null;
            if(typeof window !== 'undefined'){
                localStorage.removeItem('user')
            }
        },
        loadUserFromStorage: (state) => {
            if(typeof window !== 'undefined'){
                const user = JSON.parse(localStorage.getItem('user'));
                if(user){
                    state.name = user.name;
                    state.email = user.email;
                    state.token = user.token;
                }
            }
        }
    }
})

export const {setUsers, clearUser, loadUserFromStorage} = userSlice.actions;

export default userSlice.reducer