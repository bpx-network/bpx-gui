import type { Wallet } from '@bpx-network/api';
import { WalletType } from '@bpx-network/api';

export default function findCATWalletByAssetId(wallets: Wallet[], assetId: string) {
  return wallets.find(
    (wallet) => wallet.type === WalletType.CAT && wallet.meta?.assetId?.toLowerCase() === assetId.toLowerCase()
  );
}
