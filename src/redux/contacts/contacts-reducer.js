import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { addNewContact, deleteContact, changeFilter } from './contacts-actions';
import { contacts } from '../../contacts';

const items = createReducer(contacts, {
  [addNewContact]: (state, { payload }) => [payload, ...state],
  [deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items,
  filter,
});

export default contactsReducer;