/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import VisibleTodoList from 'containers/VisibleTodoList/Loadable';
import AddTodo from 'containers/AddTodo/Loadable';
import Footer from '../../components/Footer';

import GlobalStyle from '../../global-styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="Todo App" defaultTitle="Simple Todo App">
        <meta name="description" content="A todo application" />
      </Helmet>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
