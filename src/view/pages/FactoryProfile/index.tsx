import React from 'react';
import { fetchFactoryByOrgId } from 'services/api';
import { useParams } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { FactoryProfileContacts } from 'view/pages/FactoryProfile/Contacts';
import { FactoryProfileAddress } from 'view/pages/FactoryProfile/Address';
import { FactoryProfileCertifications } from 'view/pages/FactoryProfile/Certifications';
import { UnverifiedFactoryAlert } from 'view/pages/FactoryProfile/UnverifiedFactoryAlert';
import { ClaimedIconButton } from 'view/components';

const useStyles = makeStyles(
  createStyles({
    title: {
      textAlign: 'center',
    },
    claimedIconBtn: {
      marginTop: 12.5,
      marginLeft: 7.5,
    },
  }),
);

export function FactoryProfile() {
  const classes = useStyles();
  const { factoryId } = useParams();

  const [{ data, loading, error }] = fetchFactoryByOrgId(factoryId);

  if (error || !data) {
    return (
      <Grid item xs={12}>
        <Typography color="error">Failed to load factory details</Typography>
      </Grid>
    );
  }

  if (loading) {
    return <div>Loading!</div>;
  }

  const { data: factory } = data;

  // A factory is unverified if it is an assertion
  const isFactoryUnverified = !!factory.assertion_id;

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h2" className={classes.title}>
          {factory.name}
        </Typography>

        {!isFactoryUnverified && (
          <div className={classes.claimedIconBtn}>
            <ClaimedIconButton size="large" />
          </div>
        )}
      </Grid>

      {isFactoryUnverified && (
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <UnverifiedFactoryAlert factory={factory} />
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <FactoryProfileCertifications certifications={factory.certificates} />
      </Grid>

      <Grid item xs={12}>
        <FactoryProfileContacts contacts={factory.contacts} />
      </Grid>

      <Grid item xs={12}>
        <FactoryProfileAddress address={factory.address} />
      </Grid>
    </Grid>
  );
}
