import { observer } from 'mobx-react';
import React from 'react';
import { Redirect } from 'react-router';
import { Button, Form, Input } from 'semantic-ui-react';

import authStore from '../stores/authStore';

const Profile = observer(() => {
  const loginIn = authStore.login;
  const { login, password } = authStore.values;
  const authenticated = authStore.authenticated;
  const user = authStore.user;

  return authenticated && user ? (
    <div>{user.name}</div>
  ) : (
    <Form>
      <Form.Field required>
        <Input placeholder="username" value={login} onChange={e => authStore.setLogin(e.target.value)} />
      </Form.Field>
      <Form.Field required>
        <Input
          placeholder="password"
          value={password}
          type="password"
          onChange={e => authStore.setPassword(e.target.value)}
        />
      </Form.Field>
      <Button type="submit" onClick={loginIn}>
        LogIn
      </Button>
    </Form>
  );
});

export default Profile;
