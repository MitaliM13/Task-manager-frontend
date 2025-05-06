import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    token: null,
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUsers: (state, action) => {
            const {name, email, token , id} = action.payload
            state.name = name;
            state.email = email;
            state.token = token;
            state.id = id

            if(typeof window !== 'undefined'){
                localStorage.setItem('user', JSON.stringify({name,email, token, id}))
            }
        },
        clearUser: (state) => {
            state.name = null;
            state.email = null;
            state.token = null;
            state.id = null;
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
                    state.id = user.id;
                }
            }
        }
    }
})

export const {setUsers, clearUser, loadUserFromStorage} = userSlice.actions;

export default userSlice.reducer