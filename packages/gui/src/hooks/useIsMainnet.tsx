import { useGetNetworkInfoQuery } from '@bpx-network/api-react';

export default function useIsMainnet(): boolean | undefined {
  const { data: networkInfo } = useGetNetworkInfoQuery();
  const networkName = networkInfo?.networkName;

  if (!networkPrefix) {
    return undefined;
  }

  return networkName === 'mainnet';
}
