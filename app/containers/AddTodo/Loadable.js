/**
 *
 * Asynchronously loads the component for AddTodo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
