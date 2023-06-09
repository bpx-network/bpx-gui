import {
  useGetThrottlePlotQueueQuery,
  useGetTotalHarvestersSummaryQuery,
} from '@bpx-network/api-react';
import { Loading, Flex } from '@bpx-network/core';
import { Grid } from '@mui/material';
import React from 'react';

import PlotOverviewPlots from './PlotOverviewPlots';

export default function PlotOverview() {
  const { isLoading: isLoadingQueue } = useGetThrottlePlotQueueQuery();
  const { isLoading: isLoadingTotalHarvestrSummary } = useGetTotalHarvestersSummaryQuery();

  const isLoading = isLoadingQueue || isLoadingTotalHarvestrSummary;

  return (
    <Flex flexDirection="column" gap={3}>
      {isLoading ? (
        <Loading center />
      ) : (
        <PlotOverviewPlots />
      )}
    </Flex>
  );
}
