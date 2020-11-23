import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'view/context';
import { User } from 'stores';
import { useStores } from 'services/hooks';
import { observer } from 'mobx-react-lite';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import { UnauthenticatedLayout } from './UnauthenticatedLayout';

// TODO: Remove hack using `isAuthenticated` and `isAuthenticating`
// once sesison tokens are in place
export const Layout = observer(() => {
  const {
    userStore: { user, isAuthenticated, isAuthenticating },
  } = useStores();

  return (
    <Auth0Provider
      domain="oauth.iam.perf.target.com/auth/oauth/v2"
      clientId="consensource_npe_im"
      redirectUri={window.location.origin}
    >
      <Router>
        {isAuthenticated || isAuthenticating ? (
          <AuthProvider user={user || ({} as User)}>
            <AuthenticatedLayout />
          </AuthProvider>
        ) : (
          <UnauthenticatedLayout />
        )}
      </Router>
    </Auth0Provider>
  );
});
