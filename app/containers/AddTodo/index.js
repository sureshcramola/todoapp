/**
 *
 * AddTodo
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { addTodo } from './actions';

const AddTodoWrapper = styled.div`
  margin-top:50px;
  max-width: 100%;
  width: 100%;
`;

const Form = styled.form`
  max-width: 700px;
  width: 100%;
  margin: 1rem auto 0;
`;

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <AddTodoWrapper>
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <InputGroup className="mb-0">
          <FormControl
            placeholder="Enter todo title"
            aria-label="Enter todo title"
            ref={node => input = node}
          />
          <InputGroup.Append>
            <Button type="submit" bg="primary">
              Add Todo
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </AddTodoWrapper>
  );
};

// const mapStateToProps = createStructuredSelector({
//   addTodo: makeSelectAddTodo(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default connect()(AddTodo);
