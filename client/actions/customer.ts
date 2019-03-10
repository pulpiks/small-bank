import { Dispatch, State } from "../store";
import { GetRequest } from "../utils";

export const GET_CUSTOMER_RELATIONS = 'GET_CUSTOMER_RELATIONS'
export const GET_CUSTOMER_RELATIONS_FAILURE = 'GET_CUSTOMER_RELATIONS_FAILURE'

import config from '../config'
import { Transaction, Customer } from "../interfaces";
import { string } from "prop-types";

export interface CustomRelationsResponse {
    name: Customer['name'],
    surname: Customer['surname'],
    balance: number,
    transactions: Transaction[],
}

export type GetCustomerRelationsSuccess = {
    type: typeof GET_CUSTOMER_RELATIONS
    data: CustomRelationsResponse,
    customerId: string,
} 

export type GetCustomerRelationsFailure = {
    type: typeof GET_CUSTOMER_RELATIONS_FAILURE
} 

export const getCustomerRelatedInfo = (customerId: string) => {
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
            const response = await GetRequest(`/customer/${customerId}/relations`)
            return dispatch({
                type: GET_CUSTOMER_RELATIONS,
                data: response.data,
                customerId,
            })
        }
        catch(e) {
            return dispatch({
                type: GET_CUSTOMER_RELATIONS_FAILURE,
                customerId,
            })
        }
    }
}

