/**
 *
 * TodoItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import RemoveTodo from '../../containers/RemoveTodo';

const TextWrapper = styled.div`
  cursor: pointer;
`;

function TodoItem({ onClick, id, completed, text }) {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <TextWrapper
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
        onClick={onClick}
      >
        {text}
      </TextWrapper>
      <RemoveTodo id={id} />
    </ListGroup.Item>
  );
}

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default memo(TodoItem);
