import { object, string, number } from "joi";

export type SequelizeFields<T> = T & {
    readonly createdAt: string,
    readonly deletedAt: null | string,
    readonly id: number,
    readonly updatedAt: string,
}
  
export const SequelizeFieldsSchema = object({
    createdAt: string().optional(),
    deletedAt: string().allow(null).optional(),
    id: number().integer().min(1).optional(),
    updatedAt: string().optional(),
})
