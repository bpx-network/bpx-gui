import { useGetPlottersQuery } from '@bpx-network/api-react';
import { Suspender } from '@bpx-network/core';
import React from 'react';

import PlotAddForm from './PlotAddForm';

export default function PlotAdd() {
  const { data: plotters, isLoading: isLoadingPlotters } = useGetPlottersQuery();

  const isLoading = isLoadingPlotters;

  if (isLoading) {
    return <Suspender />;
  }

  return <PlotAddForm plotters={plotters} />;
}
