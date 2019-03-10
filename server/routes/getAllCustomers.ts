
import {Context} from 'koa';
import { object, number, string } from 'joi';

import { validate } from '../utils/validate';
import { getAllCustomers } from '../store';

// import models from '../models/models'
// import { Customer as CustomerInterface, CustomerSchema } from '../interfaces/customer';

// const {Customer} = models;

interface Payload {
    readonly customerID: string,
}

export const GetAllCustomerRelationsSchema = object({
    customerID: string(),
})


export const readAllCustomers = async (ctx: Context, next) => {
    const result = getAllCustomers()    
    console.log(result)
    ctx.status = 200
    ctx.body = result
}