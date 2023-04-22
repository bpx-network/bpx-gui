import { useGetNetworkInfoQuery } from '@bpx-network/api-react';

export default function useIsMainnet(): boolean | undefined {
  const { data: networkInfo } = useGetNetworkInfoQuery();
  console.log(networkInfo);
  const networkName = networkInfo?.networkName;
  console.log(networkName);

  if (!networkName) {
    return undefined;
  }

  return networkName === 'mainnet';
}
