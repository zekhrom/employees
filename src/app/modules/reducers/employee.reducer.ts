import { Action } from '@ngrx/store';
import { Employee } from '../models/employees';

export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const DELETE = 'DELETE';


export function addEmployeeReducer(state: Employee[] = [], action) {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];
    case EDIT:
      const item = action.payload;
      return state.map(value => { value.id == item.id ? item as Employee : value });
    case DELETE:
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    default:
      return state;
  }
}
