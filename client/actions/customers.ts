import { Dispatch, State } from "../store";
import { GetRequest } from "../utils";

export const GET_CUSTOMERS = 'GET_CUSTOMERS'
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE'

import config from '../config'

export interface Customer {
    readonly name: string,
    readonly surname: string,
    readonly id: string,
}

type CustomersResponse = Customer[]

export type GetCustomersTypeSuccess = {
    type: typeof GET_CUSTOMERS
    customers: CustomersResponse,
} 

export type GetCustomersTypeFailure = {
    type: typeof GET_CUSTOMERS_FAILURE
} 

export const getAllCustomers = () => {
    return async (dispatch: Dispatch, getState: () => State) => {
        try {
            // const {categories} = getState()
            // const cat = categories.find(c => c.slug === slug)
            // const category = await client.getEntries({
            //     content_type: 'post',
            //     'fields.categories.sys.id': cat.id,
            //     order: 'sys.createdAt',
            // })
            // const posts = category.items.map((item) => item.fields)
            const response = await GetRequest(`/customers`)
            return dispatch({
                type: GET_CUSTOMERS,
                customers: response.data,
            })
        }
        catch(e) {
            return dispatch({
                type: GET_CUSTOMERS_FAILURE,
            })
        }
    }
}

