import {object, array, string} from 'joi'

export interface Account {
  readonly id: string,
  readonly customerId: string,
}

export const AccountSchema = object({
    id: string(),
    customerId: string(),
})

export const GetAccountsByCustomerId = array().items(string())

