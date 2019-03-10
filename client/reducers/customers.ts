import { Reducer } from 'redux'
import { GET_CUSTOMERS, GET_CUSTOMERS_FAILURE, GetCustomersTypeSuccess, GetCustomersTypeFailure } from '../actions/customers';
import { Customer } from '../interfaces';
import { GET_CUSTOMER_RELATIONS, GetCustomerRelationsSuccess, GetCustomerRelationsFailure, GET_CUSTOMER_RELATIONS_FAILURE, CustomRelationsResponse } from '../actions/customer';

export interface CustomersState {
    readonly customers: {
        [id: string]: Customer
    },
    readonly relations: {
        [id: string]: CustomRelationsResponse
    } 
}

const defaultState = {
    customers: {},
    relations: {},
} as CustomersState

type Action = GetCustomersTypeSuccess | GetCustomersTypeFailure | GetCustomerRelationsSuccess | GetCustomerRelationsFailure

export const customers: Reducer<CustomersState> = (state = defaultState, action: Action) => {
  switch (action.type) {
        case GET_CUSTOMERS: 
            return {
                ...state,
                customers: action.customers.reduce((res, customer) => ({
                    ...res,
                    [customer.id]: customer
                }), {})
            }
        case GET_CUSTOMERS_FAILURE: 
            return {
                ...state,
                customers: {},
            }
        case GET_CUSTOMER_RELATIONS:
            return {
                ...state,
                relations: {
                    ...state.relations,
                    [action.customerId]: action.data
                }
            }  
        case GET_CUSTOMER_RELATIONS_FAILURE:
            const {relations} = state;
            const {customerId, ...rest} = relations
            return {
                ...state,
                relations: rest,
            }      
        default: return state
  }
}
