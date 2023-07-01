import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContacts,
} from './contactsOperations';
import { logOut } from 'redux/auth/authOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    filter: '',
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => handlePending(state))
      .addCase(deleteContactThunk.pending, state => handlePending(state))
      .addCase(addContactThunk.pending, state => handlePending(state))
      .addCase(fetchContacts.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(addContactThunk.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(deleteContactThunk.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = [...state.contacts, action.payload];
        // state.contacts.push(action.payload);
      })

      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
        // const index = state.items.findIndex(
        //   task => task.id === action.payload.id
        // );
        // state.items.splice(index, 1);
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload.toLowerCase();
    },
  },
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
