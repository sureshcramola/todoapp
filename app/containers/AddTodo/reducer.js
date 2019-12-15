/*
 *
 * AddTodo reducer
 *
 */
import { ADD_TODO, TOGGLE_TODO } from './constants';
import { DELETE_TODO } from '../VisibleTodoList/constants';

export const initialState = [
  { id: 0, text: 'update softwares', completed: false },
  { id: 1, text: 'watch movie', completed: false },
];

/* eslint-disable default-case, no-param-reassign */
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export default todos;
