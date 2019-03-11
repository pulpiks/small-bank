
import {Context} from 'koa';
import { object, number, string } from 'joi';

import { validate } from '../utils/validate';
import { getAccountByCustomer, createTransaction, createAccount, getAllCustomers } from '../store';

// import models from '../models/models'
// import { Customer as CustomerInterface, CustomerSchema } from '../interfaces/customer';

// const {Customer} = models;

interface CreateCustomerPayload {
    readonly customerID: string,
    readonly initialCredit: number, 
}

export const CreateCustomerPayloadSchema = object({
    initialCredit: number().positive().allow(0),
    customerID: string(),
})


export const createTransactionRoute= async (ctx: Context, next) => {
    try {
        const data: CreateCustomerPayload = ctx.request.body
        const values = validate(data, CreateCustomerPayloadSchema)
        const {initialCredit, customerID} = values
        const allCustomers = getAllCustomers()
        const customer = allCustomers.find(c => c.id === customerID)
        if (!customer) {
            throw new Error('customer doesn\'t exist')
        }
        const account = createAccount(customerID)
        if (initialCredit > 0) {
            createTransaction({
                accountId: account.id,
                amount: initialCredit
            })
        }
        ctx.status = 200
        ctx.body = 'ok'
    }
    catch (e) {
        ctx.status = 404
        ctx.body = {
            error: e.message 
        }
    }
}