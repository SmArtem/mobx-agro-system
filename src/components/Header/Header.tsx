import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Popup } from 'semantic-ui-react';

import Profile from '../Profile';

const Header: React.FC = () => (
  <div>
    <Link to="/"> Home </Link>
    <Link to="/about"> About </Link>
    <Link to="/topics"> Topics </Link>
    <Popup on={'click'} trigger={<Button circular icon="user" />}>
      <Profile />
    </Popup>
  </div>
);

export default Header;
