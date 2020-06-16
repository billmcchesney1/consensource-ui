import React, { useState } from 'react';
import CreateUserForm, { CreateUserFormState } from 'view/forms/CreateUser';
import stores from 'stores';
import { useHistory } from 'react-router-dom';

export default function UserSignUp() {
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();

  const onSubmit = async ({ username, password }: CreateUserFormState) => {
    try {
      await stores.userStore.createUser(username, password);
      history.push('/dashboard');
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <div>
      <h1>User Sign Up</h1>
      <h3>{errMsg}</h3>
      <CreateUserForm onSubmit={onSubmit} />
    </div>
  );
}
