/*
 *
 * AddTodo actions
 *
 */

import { ADD_TODO, TOGGLE_TODO } from './constants';

let nextTodoId = 2;

export const addTodo = text => ({
  type: ADD_TODO,
  // eslint-disable-next-line no-plusplus
  id: nextTodoId++,
  text,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});
