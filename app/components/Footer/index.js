/**
 *
 * Footer
 *
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import FilterLink from '../../containers/FilterLink';
import { VisibilityFilters } from '../../containers/FilterLink/constants';

const FooterWrapper = styled.footer`
  max-width: 700px;
  width: 100%;
  background-color: #282c34;
  margin: 0 auto;
`;
const Footer = () => (
  <FooterWrapper>
    <Card variant="primary">
      <Card.Body>
        <span>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
          Completed
        </FilterLink>
      </Card.Body>
    </Card>
  </FooterWrapper>
);

export default Footer;
