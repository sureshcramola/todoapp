import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the removeTodo state domain
 */

const selectRemoveTodoDomain = state => state.removeTodo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RemoveTodo
 */

const makeSelectRemoveTodo = () =>
  createSelector(
    selectRemoveTodoDomain,
    substate => substate,
  );

export default makeSelectRemoveTodo;
export { selectRemoveTodoDomain };
