
import {Context} from 'koa';
import { object, number, string } from 'joi';

import { validate } from '../utils/validate';
import { getCustomerRelations, getAllCustomers } from '../store';


interface Payload {
    readonly customerID: string,
}

export const GetAllCustomerRelationsSchema = object({
    customerID: string(),
})


export const getAllCustomerRelations = async (ctx: Context, next) => {
    try {
        const data: Payload = ctx.params
        const values = validate(data, GetAllCustomerRelationsSchema)
        const {customerID} = values
        const result = getCustomerRelations(customerID)    
        if (!result) {
            throw new Error('no customer with current id')
        }
        ctx.status = 200
        ctx.body = result
    }
    catch (e) {
        ctx.status = 404
        ctx.body = {
            error: e.message 
        }
    }
}