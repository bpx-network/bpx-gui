import { useGetBlockchainStateQuery } from '@bpx-network/api-react';
import { FormatLargeNumber, CardSimple } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import React from 'react';

export default function BeaconCardVDFSubSlotIterations() {
  const { data, isLoading, error } = useGetBlockchainStateQuery();
  const value = data?.peak?.subSlotIters ?? 0;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>VDF Sub Slot Iterations</Trans>}
      value={<FormatLargeNumber value={value} />}
      error={error}
    />
  );
}
