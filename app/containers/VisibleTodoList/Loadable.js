/**
 *
 * Asynchronously loads the component for VisibleTodoList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
