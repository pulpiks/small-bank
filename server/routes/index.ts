import koaBody from 'koa-body';
import KoaRouter from 'koa-router'
import { PATH } from '../consts';

import {createTransactionRoute} from './createTransaction'
import { getAllCustomerRelations } from './getAllCustomerRelations';
import { addCustomers } from './addCustomer';
import { readAllCustomers } from './getAllCustomers';

export default (router: KoaRouter) => {
    router.post(`${PATH}/add_customers`, koaBody(), addCustomers)
    router.get(`${PATH}/customers`, readAllCustomers)
    router.post(`${PATH}/transaction/create`, koaBody(), createTransactionRoute)
    router.get(`${PATH}/customer/:customerID/relations`, getAllCustomerRelations)
}