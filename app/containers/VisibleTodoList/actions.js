/*
 *
 * VisibleTodoList actions
 *
 */

import { TOGGLE_TODO } from '../AddTodo/constants';
import { DELETE_TODO } from './constants';

export const toogleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});
