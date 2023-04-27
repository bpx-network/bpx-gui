import { useGetPlottersQuery, useGetKeysQuery } from '@bpx-network/api-react';
import { Alert } from '@mui/material';
import { Trans } from '@lingui/macro';
import {
  Suspender,
  Button,
  TooltipIcon
} from '@bpx-network/core';
import React from 'react';

import PlotAddForm from './PlotAddForm';

export default function PlotAdd() {
  const { data: plotters, isLoading: isLoadingPlotters } = useGetPlottersQuery();
  const { data: publicKeyFingerprints, isLoading: isLoadingPublicKeys, error, refetch } = useGetKeysQuery();

  const isLoading = isLoadingPlotters || isLoadingPublicKeys;
  console.log(publicKeyFingerprints);

  if (isLoading) {
    return <Suspender />;
  }
  
  else if(error) {
	return
      <Alert
        severity="error"
        action={
          <Button onClick={refetch} color="inherit" size="small">
            <Trans>Try Again</Trans>
          </Button>
        }
      >
        <Trans>Unable to load the list of the keys</Trans>
        &nbsp;
        <TooltipIcon>{error.message}</TooltipIcon>
      </Alert>;
  }
  
  else if(publicKeyFingerprints.length == 0) {
    console.log("alert");
	return
      <Alert severity="error">
        <Trans>No keys added</Trans>
        &nbsp;
        <TooltipIcon>Add at least one key to be able to create plots</TooltipIcon>
      </Alert>;
  }
  
  console.log("after alert");

  return <PlotAddForm plotters={plotters} fingerprints={publicKeyFingerprints} />;
}
