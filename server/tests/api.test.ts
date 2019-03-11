
import koaBody from "koa-body";
import generateServer from './server'
import request from 'supertest'

import testCustomers from '../fixtures/customers.json'
import { bulkCreateCustomers } from "../store";

const PORT = process.env.PORT || 5000

describe('Test API', () => {
    let beforeServer
    let agent
    beforeEach(() => {
        beforeServer = generateServer()
        beforeServer.app.use(koaBody()).use((ctx, next) => {
            console.log(ctx)
            return next()
        })
        agent = request.agent(beforeServer.server);
    })

    afterEach(() => {
        beforeServer.server.close()
    })

    describe('readCustomers', () => {
        
        it('should return status 200', async () => {
            const response  = await agent
                .post(`/small-bank/add_customers`)
                .set('Accept', 'application/json')
                .send(testCustomers)
            expect(response.status).toBe(200)
        });

    });

    describe('createTransactionRoute', async() => {
        let newCustomers;
        beforeEach(() => {
            newCustomers = bulkCreateCustomers(testCustomers)
        })

        it('should return status 404 if customer doesn\'t exist', () => {
            return agent
                .post(`/small-bank/transaction/create`)
                .set('Accept', 'application/json')
                .send({
                    initialCredit: 50,
                    customerID: '12312329387',
                })
                .catch((e) => {
                    expect(e.status).toBe(404)
                    expect(e.response.body.error).toBe('customer doesn\'t exist')
                })
        });

        it('should return status 200 if customer exists', () => {
            return agent
                .post(`/small-bank/transaction/create`)
                .set('Accept', 'application/json')
                .send({
                    initialCredit: 50,
                    customerID: newCustomers[0].id,
                })
                .then((res) => {
                    expect(res.status).toBe(200)
                })
        });
    })


    describe('getAllCustomerRelations', async() => {
        let newCustomers;
        beforeEach(() => {
            newCustomers = bulkCreateCustomers(testCustomers)
        })

        it('should return status 404 if customer doesn\'t exist', () => {
            return agent
                .get(`/small-bank/customer/1231/relations`)
                .set('Accept', 'application/json')
                .catch((e) => {
                    expect(e.status).toBe(404)
                    expect(e.response.body.error).toBe('no customer with current id')
                })
        });

        it('should return status 200 if customer exists', () => {
            return agent
                .get(`/small-bank/customer/${newCustomers[0].id}/relations`)
                .set('Accept', 'application/json')
                .then((res) => {
                    expect(res.status).toBe(200)
                })
        });
    })
});