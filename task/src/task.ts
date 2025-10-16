import { Token, Transfer, USD, TokenAmount } from '@mimicprotocol/lib-ts'
import { inputs } from './types'
import { ERC20 } from './types/ERC20'

// Mimic task main function
export default function main(): void {
  // Instantiate the ERC20 token contract object on the specified chain
  const tokenContract = new ERC20(inputs.token, inputs.chainId)

  // Get the wallet's token balance
  const balance = tokenContract.balanceOf(inputs.recipient)

  // Convert balance to USD value using Mimic's TokenAmount helper
  const token = Token.fromAddress(inputs.token, inputs.chainId)
  const balanceInUsd = TokenAmount.fromBigInt(token, balance).toUsd()

  // Threshold in USD (from inputs)
  const thresholdUsd = USD.fromI32(inputs.thresholdUSD)

  // Log the current balance in USD
  console.log('Balance in USD: ' + balanceInUsd.toString())

  // If balance is below threshold, create a transfer intent to refill
  if (balanceInUsd.lt(thresholdUsd)) {
    Transfer
      .create(inputs.chainId, inputs.token, inputs.amount, inputs.recipient, inputs.fee)
      .send()

    console.log(`Refill initiated: ${inputs.amount.toString()} tokens sent to ${inputs.recipient}`)
  }
}
