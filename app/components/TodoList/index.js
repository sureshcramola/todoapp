/**
 *
 * TodoList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

import Todo from '../TodoItem';

const TodoListWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  background-color: #282c34;
  padding: 10px 0px;
`;

const ListGroupWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #282c34;
  padding: 0px 0;
  margin: 0 auto;
`;

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <TodoListWrapper>
    <ListGroupWrapper>
      <ListGroup>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => toggleTodo(todo.id)}
            onDeleteClick={() => deleteTodo(todo.id)}
          />
        ))}
      </ListGroup>
    </ListGroupWrapper>
  </TodoListWrapper>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
