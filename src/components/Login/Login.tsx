import { observer } from 'mobx-react';
import React from 'react';
import { Redirect } from 'react-router';
import { Button, Form, Input } from 'semantic-ui-react';

import authStore from '../../stores/authStore';

import logo from '../../assets/images/logo.png';
import './Login.scss';

const Login = observer(() => {
  const loginIn = authStore.login;
  const { login, password } = authStore.values;
  const authenticated = authStore.authenticated;

  if (authenticated) {
    return <Redirect to={'/about'} />;
  }

  return (
    <div className="login">
      <div className="login__content">
        <img className="login__logo" src={logo} alt="logo" />
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
      </div>
    </div>
  );
});

export default Login;
