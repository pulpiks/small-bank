import { Store } from '../store/state';
import { Account } from '../interfaces/account';
import { Customer } from '../interfaces/customer';

const defaultCustomers: Customer[] = [{ 
    id: '123',
    name: 'Bernardo',
    surname: 'Bertalucci' 
}, {
    id: '456',
    name: 'qweqwe',
    surname: 'qweqweqwe' 
}]

const defaultAccounts: Account[] = [{
    id: '1',
    customerId: '123',
}, {
    id: '2',
    customerId: '456',
},{
    id: '3',
    customerId: '123',
},{
    id: '4',
    customerId: '456',
},{
    id: '5',
    customerId: '456',
},]

const defaultTransactions: Store['transactions'] = [
    {
        id: '1',
        accountId: '1',
        amount: 100
    },
    {
        id: '2',
        accountId: '1',
        amount: -10
    },
    {
        id: '3',
        accountId: '2',
        amount: 20
    },
    {
        id: '4',
        accountId: '5',
        amount: 10
    },
    {
        id: '5',
        accountId: '2',
        amount: -50
    },
    {
        id: '6',
        accountId: '3',
        amount: 100
    },
    {
        id: '1',
        accountId: '5',
        amount: 100
    },
]

const mockStore = {} as Store

jest.mock('../store/state.ts', () => ({
    store: mockStore
}))

import { createTransaction, getCustomerRelations } from '../store';

describe('methods', () => {
    beforeEach(() => {
        mockStore.customers = [...defaultCustomers]
        mockStore.transactions = [...defaultTransactions]
        mockStore.accounts = [...defaultAccounts]
    })
    test('createTransaction should change store', () => {
        const newTransaction = createTransaction({
            accountId: '123',
            amount: 10
        })
        expect(newTransaction).toEqual({
            id: expect.any(String),
            accountId: '123',
            amount: 10,
        })
        expect(mockStore.transactions).toEqual([
            ...defaultTransactions,
            newTransaction,
        ])
    })

    describe('getAllCustomerRelations', () => {
        test('should return undefined for not existing customer', () => {
            const response = getCustomerRelations('124376576576')
            expect(response).toBe(undefined)
        })

        test('should return object for existing customer that has no acccounts', () => {
            mockStore.customers.push({
                id: '7',
                name: 'Antonio',
                surname: 'Banderas' 
            })
            const response = getCustomerRelations('7')
            expect(response).toEqual({
                name: 'Antonio',
                surname: 'Banderas',
                balance: 0,
                transactions: [],  
            })
        })

        test('should return object for existing customer that has acccounts', () => {
            const response = getCustomerRelations('123')
            expect(response).toEqual({
                name: 'Bernardo',
                surname: 'Bertalucci', 
                balance: 190,
                transactions: [{
                    id: '1',
                    accountId: '1',
                    amount: 100
                },
                {
                    id: '2',
                    accountId: '1',
                    amount: -10
                },
                {
                    id: '6',
                    accountId: '3',
                    amount: 100
                }],  
            })
        })
    })
})


