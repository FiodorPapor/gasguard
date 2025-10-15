import { useMemo } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { CONTRACTS, WALLET_REFILL_ABI } from "@/lib/contracts";

export function useGasGuard() {
  const { address: connected } = useAccount();

  const contract = useMemo(() => ({
    address: CONTRACTS.WALLET_REFILL_ADDRESS as `0x${string}`,
    abi: WALLET_REFILL_ABI,
  }), []);

  const isConfigured =
    (CONTRACTS.WALLET_REFILL_ADDRESS?.startsWith("0x") ?? false) &&
    (CONTRACTS.HOT_WALLET_ADDRESS?.startsWith("0x") ?? false);

  const threshold = useReadContract({
    ...contract,
    functionName: "threshold",
    query: { enabled: isConfigured },
  });

  const refillAmount = useReadContract({
    ...contract,
    functionName: "refillAmount",
    query: { enabled: isConfigured },
  });

  const hotWallet = useReadContract({
    ...contract,
    functionName: "hotWallet",
    query: { enabled: isConfigured },
  });

  const owner = useReadContract({
    ...contract,
    functionName: "owner",
    query: { enabled: isConfigured },
  });

  useWatchContractEvent({
    ...contract,
    eventName: "Refilled",
    enabled: isConfigured,
    onLogs: (logs) => {
      // eslint-disable-next-line no-console
      console.log("Refilled event logs:", logs);
    },
  });

  return {
    connected,
    isConfigured,
    data: {
      threshold: threshold.data as bigint | undefined,
      refillAmount: refillAmount.data as bigint | undefined,
      hotWallet: hotWallet.data as `0x${string}` | undefined,
      owner: owner.data as `0x${string}` | undefined,
    },
    status: {
      threshold,
      refillAmount,
      hotWallet,
      owner,
    },
  };
}
