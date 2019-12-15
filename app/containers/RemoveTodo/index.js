/**
 *
 * RemoveTodo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'react-bootstrap';

import { deleteTodo } from '../VisibleTodoList/actions';

const RemoveTodo = ({ dispatch, id }) => (
  <div>
    <Button
      onClick={e => {
        e.preventDefault();
        dispatch(deleteTodo(id));
      }}
      variant="danger"
    >
      X
    </Button>
  </div>
);

RemoveTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  null,
  null,
);

RemoveTodo.propTypes = {
  id: PropTypes.number.isRequired,
};

export default compose(withConnect)(RemoveTodo);
