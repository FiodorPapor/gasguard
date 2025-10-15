import abi from "../lib/abis/WalletRefill.json";

const need = [
  "hotWallet",
  "threshold",
  "refillAmount",
  "owner",
  "checkAndRefill",
  "updateParams",
  "deposit",
  "Refilled",
] as const;

type AbiItem = { type: string; name?: string };
const items = abi as AbiItem[];

const has = (n: string) =>
  items.some((i) => i.name === n || (i.type === "event" && i.name === n));

const result = need.map((n) => [n, has(n)]);
const allOk = result.every(([_, ok]) => ok);

console.log("ABI CHECK ->", Object.fromEntries(result));
if (!allOk) {
  console.error("❌ ABI missing required entries");
  process.exit(1);
} else {
  console.log("✅ ABI looks good");
}
