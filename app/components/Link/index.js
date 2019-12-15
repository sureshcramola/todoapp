/**
 *
 * Link
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Link = ({ active, children, onClick }) => (
  <Button
    onClick={onClick}
    disabled={active}
    type="button"
    style={{
      marginLeft: '4px',
    }}
    variant="success"
  >
    {children}
  </Button>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
