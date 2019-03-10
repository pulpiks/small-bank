import { createSelector } from 'reselect';
import { State } from '../store';
import { Customer } from '../interfaces';
import { CustomersState } from '../reducers/customers';

const customers = (state: State) => state.customers.customers

export const getCustomers = createSelector(
    customers,
    (customers) => Object.values(customers)
)