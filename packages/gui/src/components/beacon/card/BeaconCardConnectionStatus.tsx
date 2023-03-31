import { ServiceName } from '@bpx-network/api';
import { useService } from '@bpx-network/api-react';
import { CardSimple } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import React from 'react';

export default function BeaconCardConnectionStatus() {
  const { isRunning, isLoading, error } = useService(ServiceName.BEACON);

  return (
    <CardSimple
      loading={isLoading}
      valueColor={isRunning ? 'primary' : 'textPrimary'}
      title={<Trans>Connection Status</Trans>}
      value={isRunning ? <Trans>Connected</Trans> : <Trans>Not connected</Trans>}
      error={error}
    />
  );
}
