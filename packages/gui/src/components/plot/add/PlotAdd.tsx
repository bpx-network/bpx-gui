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

  return <PlotAddForm plotters={plotters} fingerprints={publicKeyFingerprints} />;
}
