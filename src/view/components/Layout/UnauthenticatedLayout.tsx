import React from 'react';
import { Grid, Snackbar, makeStyles, createStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useStores } from 'services/hooks';
import { UnauthedNavbar } from 'view/components';
import { UnauthenticatedRoutes } from './Routes';
import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      margin: theme.spacing(8),
      flexGrow: 1,
    },
  }),
);

export const UnauthenticatedLayout = observer(() => {
  const classes = useStyles();
  const { snackbarStore } = useStores();
  const Auth0 = useAuth0();
  console.log({ Auth0 });

  return (
    <Grid alignItems="center" justify="center" container>
      <nav>
        <UnauthedNavbar />
      </nav>

      <main className={classes.content}>
        <Button onClick={Auth0.loginWithRedirect}>Login</Button>
        <UnauthenticatedRoutes />
        <Snackbar
          message={snackbarStore.message}
          open={snackbarStore.isOpen}
          onClose={snackbarStore.handleClose}
          autoHideDuration={3000}
        />
      </main>
    </Grid>
  );
});
