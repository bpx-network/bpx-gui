import { useGetNetworkInfoQuery } from '@bpx-network/api-react';
import { CardSimple } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import React from 'react';

export default function BeaconCardNetworkName() {
  const { data: networkInfo, isLoading, error } = useGetNetworkInfoQuery();
  const value = networkInfo?.networkName;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>Network Name</Trans>}
      value={value}
      error={error}
    />
  );
}
