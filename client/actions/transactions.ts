import { push } from 'connected-react-router'

import { Dispatch, State } from "../store";
import { PostRequest } from "../utils";

export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
export const CREATE_TRANSACTION_FAILURE = 'CREATE_ORDER_FAILURE'

import config from '../config'


export type CreateTransactionTypeSuccess = {
    type: typeof CREATE_TRANSACTION
    customerId: string,
} 

export type CreateTransactionTypeFailure = {
    type: typeof CREATE_TRANSACTION_FAILURE
} 

interface DataType {
    readonly customerId: string,
    readonly amount: number,
}

export const createTransaction = (data: DataType) => {
    return async (dispatch: Dispatch, getState: () => State) => {
        try {
            const res = await PostRequest(`/transaction/create`, {
                customerID: data.customerId,
                initialCredit: data.amount,
            })
            dispatch({
                type: CREATE_TRANSACTION,
                customerId: data.customerId
            })
            dispatch(push(`/customer/${data.customerId}`))
        }
        catch(e) {
            return dispatch({
                type: CREATE_TRANSACTION_FAILURE,
                customerId: data.customerId
            })
        }
    }
}


