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
      return [...state, action.payload];
    case DELETE:
      return [...state, action.payload];
    default:
      return state;
  }
}
