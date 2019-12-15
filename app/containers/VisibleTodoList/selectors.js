import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the visibleTodoList state domain
 */

const selectVisibleTodoListDomain = state =>
  state.visibleTodoList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VisibleTodoList
 */

const makeSelectVisibleTodoList = () =>
  createSelector(
    selectVisibleTodoListDomain,
    substate => substate,
  );

export default makeSelectVisibleTodoList;
export { selectVisibleTodoListDomain };
