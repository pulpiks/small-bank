import {lazy, number, object, string, array} from 'joi'
import {SequelizeFields} from './SequelizeFields'

export enum Sex {
  f = 'f', m = 'm',
}

export const sexSchema = string().valid('f', 'm')

export interface Yak {
  readonly name: string,
  readonly age: number,
  readonly sex: Sex
}


export const YakSchema = object({
    name: string(),
    age: number().positive().min(0),
    sex: sexSchema
})

export const ManyYaksSchema = array().items(YakSchema)

export type YakSequelize = SequelizeFields<Yak>
