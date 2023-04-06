import { useGetHarvesterConnectionsQuery, useGetTotalHarvestersSummaryQuery } from '@bpx-network/api-react';
import { AdvancedOptions, Flex, LayoutDashboardSub, Loading } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import React from 'react';

import FarmBeaconConnections from './FarmBeaconConnections';
import FarmHeader from './FarmHeader';
import FarmHero from './FarmHero';
import FarmLastAttemptedProof from './FarmLastAttemptedProof';
import FarmLatestBlockChallenges from './FarmLatestBlockChallenges';
import FarmYourHarvesterNetwork from './FarmYourHarvesterNetwork';
import FarmCards from './card/FarmCards';

export default function Farm() {
  const { hasPlots, initialized, isLoading } = useGetTotalHarvestersSummaryQuery();
  const { data: connections } = useGetHarvesterConnectionsQuery();

  const showLoading = isLoading || (!hasPlots && !initialized);

  return (
    <LayoutDashboardSub>
      <Flex flexDirection="column" gap={2}>
        {showLoading ? (
          <Loading center>
            <Trans>Loading farming data</Trans>
          </Loading>
        ) : hasPlots ? (
          <>
            
            <Flex flexDirection="column" gap={4}>
              <FarmCards />
              <FarmLastAttemptedProof />
              <FarmLatestBlockChallenges />
              <AdvancedOptions>
                <Flex flexDirection="column" gap={3}>
                  <FarmBeaconConnections />
                  <FarmYourHarvesterNetwork />
                </Flex>
              </AdvancedOptions>
            </Flex>
          </>
        ) : (
          <>
            
            <Flex flexDirection="column" gap={4}>
              <FarmHero />
              <FarmLatestBlockChallenges />
              {!!connections && (
                <AdvancedOptions>
                  <Flex flexDirection="column" gap={3}>
                    <FarmYourHarvesterNetwork />
                  </Flex>
                </AdvancedOptions>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </LayoutDashboardSub>
  );
}
