import React, { useState } from 'react';
import { hasEmptyFields, FormErrMsg } from 'view/forms/utils';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useStores } from 'services/hooks';

export interface CreateUserFormProps {
  onSubmit: () => void;
}

export interface CreateUserFormState {
  username: string;
  password: string;
}

export const CreateUserForm = ({ onSubmit }: CreateUserFormProps) => {
  const { userStore } = useStores();
  const [errMsg, setErrMsg] = useState('');
  const [user, setUser] = useState<CreateUserFormState>({
    username: '',
    password: '',
  });

  /**
   * Create a user and an agent from the form info
   */
  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { username, password } = user;

    try {
      await userStore.createUser(username, password);
      onSubmit();
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">Create User</Typography>
        </Grid>
        <Grid item>
          <FormErrMsg msg={errMsg} />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            label="Username"
            id="username"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            label="Password"
            id="password"
            type="password"
            required
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onClick}
            disabled={hasEmptyFields(user)}
          >
            Create User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
