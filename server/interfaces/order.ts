import {lazy, number, object, string, array} from 'joi'

export enum Sex {
  f = 'f', m = 'm',
}

export const sexSchema = string().valid('f', 'm')

export interface Order {
    readonly milk?: number,
    readonly skins?: number
}

export const OrderSchema = object({
    milk: number().positive().optional(),
    skins: number().positive().optional()
})

export interface PayloadOrder {
  readonly customer: string,
  readonly order: Order
}

export const PayloadOrderSchema = object({
    customer: string(),
    order: OrderSchema
})


export interface DbOrder {
    readonly customer: string,
    readonly milk?: number,
    readonly skins?: number
    readonly real_skins?: number
    readonly real_milk?: number
}