
import {Context} from 'koa';
import { object, number, array, string } from 'joi';

import { validate } from '../utils/validate';
import { getAccountByCustomer, createTransaction, createAccount, bulkCreateCustomers } from '../store';
import { Customer } from '../interfaces/customer';

// import models from '../models/models'
// import { Customer as CustomerInterface, CustomerSchema } from '../interfaces/customer';

// const {Customer} = models;

export type RequestCustomersType = {
    name: Customer['name'],
    surname: Customer['surname'],
}[]

export const CreateCustomersSchema = array().items(object({
    name: string(),
    surname: string(),
}))


export const addCustomers = async (ctx: Context, next) => {
    try {
        const data: RequestCustomersType = ctx.request.body
        validate(data, CreateCustomersSchema)
        const res = bulkCreateCustomers(data)
        ctx.status = 200
        ctx.body = 'ok'
    }
    catch (e) {
        ctx.status = 400
        ctx.body = {
            error: e.message 
        }
    }
}