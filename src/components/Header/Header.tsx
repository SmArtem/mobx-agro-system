import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Popup } from 'semantic-ui-react';

import commonStore from '../../stores/commonStore';
import Profile from '../Profile';

const Header: React.FC = observer(() => (
  <div>
    <Link to="/">
      <Button circular icon="home" />
    </Link>
    <Link to="/about">
      <Button circular icon="info" />
    </Link>
    <Popup on={'click'} basic position="bottom right" trigger={<Button circular icon="user" />}>
      <Profile />
    </Popup>
    <Popup
      position="bottom right"
      content={commonStore.online ? 'В сети' : 'Не в сети'}
      trigger={commonStore.online ? <Button circular icon="plug" color="green" /> : <Button circular icon="plug" />}
    />
  </div>
));

export default Header;
