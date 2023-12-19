import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts:[],
    },
    reducers:{
        addContact: (state, action) =>{
             state.contacts.push(action.payload)
        },
        deleteContact: (state,action)=>{
           state.contacts = state.contacts.filter((el) => el.id !== action.payload)
        },
    }
})



export const {addContact, deleteContact} = contactsSlice.actions
