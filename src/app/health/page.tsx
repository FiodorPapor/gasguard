"use client";

import { useAccount, useChainId } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { useGasGuard } from "../../hooks/useGasGuard";

function P({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="text-sm opacity-70">{label}</span>
      <code className="text-sm">{String(value ?? "—")}</code>
    </div>
  );
}

function Status({ ok, text }: { ok: boolean; text: string }) {
  return (
    <span className={`px-2 py-1 rounded text-xs ${ok ? "bg-green-200" : "bg-red-200"}`}>
      {ok ? "OK" : "FAIL"} — {text}
    </span>
  );
}

export default function HealthPage() {
  const chainId = useChainId();
  const { address } = useAccount();
  const { isConfigured, data } = useGasGuard();

  const addrOk = CONTRACTS.WALLET_REFILL_ADDRESS?.startsWith("0x");
  const hotOk = CONTRACTS.HOT_WALLET_ADDRESS?.startsWith("0x");
  const chainOk = chainId === 80002;

  const readOk =
    !!data.threshold &&
    !!data.refillAmount &&
    !!data.hotWallet &&
    !!data.owner;

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">GasGuard /health</h1>

      <div className="space-y-2">
        <P label="Connected wallet" value={address ?? "not connected"} />
        <P label="Current Chain ID" value={chainId} />
        <P label="Expected Chain ID" value={80002} />
        <P label="Contract address" value={CONTRACTS.WALLET_REFILL_ADDRESS} />
        <P label="Hot wallet address" value={CONTRACTS.HOT_WALLET_ADDRESS} />
      </div>

      <div className="space-x-2">
        <Status ok={addrOk} text="Contract address" />
        <Status ok={hotOk} text="Hot wallet address" />
        <Status ok={chainOk} text="Polygon Amoy" />
        <Status ok={isConfigured} text="Config ready" />
        <Status ok={readOk} text="On-chain reads" />
      </div>

      <section className="mt-4 space-y-2">
        <h2 className="font-medium">On-chain values</h2>
        <P label="threshold (wei)" value={data.threshold?.toString()} />
        <P label="refillAmount (wei)" value={data.refillAmount?.toString()} />
        <P label="hotWallet()" value={data.hotWallet} />
        <P label="owner()" value={data.owner} />
      </section>

      <p className="text-xs opacity-60">
        Подписка на событие <code>Refilled</code> активна (смотри console).
      </p>
    </main>
  );
}
