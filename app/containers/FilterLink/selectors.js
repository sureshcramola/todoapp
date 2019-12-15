import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the filterLink state domain
 */

const selectFilterLinkDomain = state => state.filterLink || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FilterLink
 */

const makeSelectFilterLink = () =>
  createSelector(
    selectFilterLinkDomain,
    substate => substate,
  );

export default makeSelectFilterLink;
export { selectFilterLinkDomain };
