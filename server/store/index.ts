import * as Ramda from 'ramda'

import { Customer, CreateCustomerPayload } from "../interfaces/customer";
import { Transaction } from "../interfaces/transaction";
import { Account } from "../interfaces/account";
import { generateId } from "../utils/generateId";
import { RequestCustomersType } from '../routes/addCustomer';
import {store} from './state'

export const getAllCustomers = (): Customer[] => store.customers 

export const createCustomer = (payload: CreateCustomerPayload): Customer => {
    const newCustomer = {
        id: generateId(),
        ...payload,
    }
    store.customers.push(newCustomer);
    return newCustomer;
}

export const bulkCreateCustomers = (payload: RequestCustomersType) => {
    return payload.map((newCustomer) => createCustomer(newCustomer))
}

export const createAccount = (customerId: Customer['id']): Account => {
    const newAccount = {
        id: generateId(),
        customerId,
    }
    return (store.accounts.push(newAccount), newAccount)
} 


export const getAccountByCustomer = (customerId: Customer['id']) => 
    store.accounts.find((acc) => acc.customerId === customerId)


export enum OperationType {
    topup, withdraw, transfer
}

interface TransactionPayloadType {
    accountId: Account['id'],
    amount: number,
}

export const createTransaction = (transactionPayload: TransactionPayloadType) => {
    const newTransaction = {
        id: generateId(),
        amount: transactionPayload.amount,
        accountId: transactionPayload.accountId,
    }
    store.transactions.push(newTransaction)
    return newTransaction
}

interface CustomRelationsResponse {
    name: Customer['name'],
    surname: Customer['surname'],
    balance: number,
    transactions: Transaction[],
}

export const getCustomerRelations = (customerId: Customer['id']): CustomRelationsResponse => {
    // Name, Surname, balance, and transactions of the accounts
    type groupTransactionsInfoPartial = {
        balance: number,
        transactions: Transaction[],
    }
    const { customers, accounts, transactions } = store;
    // console.log(customers, customerId)
    const customer =  customers.find(c => c.id === customerId)
    // console.log(customer)
    if (customer) {
        const customerAccounts = accounts
            .filter(acc =>  acc.customerId === customerId)

        const groupTransactionsInfo = 
            customerAccounts.reduce((r, acc) => {
                transactions
                    .filter(tr => tr.accountId === acc.id)
                    .forEach((curTransaction) => {
                        r.balance += curTransaction.amount
                        r.transactions.push(curTransaction)    
                    })
                return r
            }, {
                balance: 0,
                transactions: [],
            } as groupTransactionsInfoPartial)
        return {
            name: customer.name,
            surname: customer.surname,
            ...groupTransactionsInfo, 
        }    
    }
}