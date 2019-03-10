import {object, array, number, string} from 'joi'

export interface Transaction {
  readonly id: string,
  readonly accountId: string,
  readonly amount: number,
}

export const TransactionSchema = object({
    id: string(),
    accountId: string(),
    amount: number(),
})

export const GetTransactionsByAccountId = array().items({
    id: string(),
    amount: number()
})

