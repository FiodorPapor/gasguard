import WalletRefillABI from './abis/WalletRefill.json'

// Contract configuration for GasGuard
export const CONTRACTS = {
  // Polygon Amoy Testnet (chainId: 80002)
  CHAIN_ID: 80002,

  // ⚠️  ПЕДРО: ВСТАВЬТЕ АДРЕС РАЗВЕРНУТОГО КОНТРАКТА ЗДЕСЬ ⚠️
  // Это адрес контракта AutoRefillWallet на Polygon Amoy
  // Пример: "0x1234567890abcdef1234567890abcdef12345678"
  WALLET_REFILL_ADDRESS: 'PASTE_CONTRACT_ADDRESS_HERE' as `0x${string}`,

  // ⚠️  ПЕДРО: ВСТАВЬТЕ АДРЕС HOT WALLET ЗДЕСЬ ⚠️
  // Это кошелек, который будет получать автоматические пополнения
  // Пример: "0x1234567890abcdef1234567890abcdef12345678"
  HOT_WALLET_ADDRESS: 'PASTE_HOT_WALLET_HERE' as `0x${string}`,
}

// Export the ABI for use with wagmi hooks
export { default as WALLET_REFILL_ABI } from './abis/WalletRefill.json'

// Contract functions available:
// - hotWallet() view returns (address) - Get the hot wallet address
// - threshold() view returns (uint256) - Get the minimum balance threshold
// - refillAmount() view returns (uint256) - Get the refill amount
// - owner() view returns (address) - Get the contract owner
// - checkAndRefill() - Check balance and refill if needed
// - updateParams(uint256 _threshold, uint256 _refillAmount) - Update threshold and refill amount (owner only)
// - deposit() payable - Deposit funds to the contract
// - updateHotWallet(address payable _newHotWallet) - Update hot wallet address (owner only)

// Events:
// - Refilled(address indexed to, uint256 amount) - Emitted when refill occurs

// ========================================
// 📋  ПЕДРО: ИНСТРУКЦИИ ДЛЯ ВСТАВКИ АДРЕСОВ
// ========================================
//
// ШАГ 1: Разверните контракт AutoRefillWallet на Polygon Amoy
// ШАГ 2: Скопируйте адрес развернутого контракта
// ШАГ 3: Замените 'PASTE_CONTRACT_ADDRESS_HERE' на этот адрес
// ШАГ 4: Укажите адрес hot wallet, который будет мониториться
// ШАГ 5: Замените 'PASTE_HOT_WALLET_HERE' на адрес hot wallet
//
// После вставки адресов:
// 1. Сохраните файл
// 2. Выполните: npm run build
// 3. Если есть ошибки типизации - проверьте адреса
//
// ========================================
