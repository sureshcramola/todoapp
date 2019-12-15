import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addTodo state domain
 */

const selectAddTodoDomain = state => state.addTodo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddTodo
 */

const makeSelectAddTodo = () =>
  createSelector(
    selectAddTodoDomain,
    substate => substate,
  );

export default makeSelectAddTodo;
export { selectAddTodoDomain };
