/*
 * TodoItem Messages
 *
 * This contains all the text for the TodoItem component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TodoItem';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TodoItem component!',
  },
});
