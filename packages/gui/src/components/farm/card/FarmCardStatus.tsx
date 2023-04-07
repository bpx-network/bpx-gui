import { StateIndicator, State, CardSimple } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import React from 'react';

export default function FarmCardStatus() {
  return (
    <CardSimple
      title={<Trans>Farming Status</Trans>}
      value={
        <Trans>Test</Trans>
      }
    />
  );
}
