import {object, string, array, number} from 'joi'
// import {SequelizeFields} from './SequelizeFields'

// export enum Sex {
//   f = 'f', m = 'm',
// }

export const sexSchema = string().valid('f', 'm')

export interface Customer {
  readonly name: string,
  readonly surname: string,
  readonly id: string,
}

export const CustomerSchema = object({
    name: string(),
    age: string(),
    id: string(),
})

export interface CreateCustomerPayload {
    readonly name: string,
    readonly surname: string,
}

export const CustomersSchema = array().items(CustomerSchema)

// export type YakSequelize = SequelizeFields<Yak>
