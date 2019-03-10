import React, {createElement} from 'react'
import { Table, Spin } from 'antd'
import {connect} from 'react-redux';

import {Dispatch as DispatchType, State} from '../../store'
import { getCustomerRelatedInfo, CustomRelationsResponse } from '../../actions/customer';
import { RoutePropsCustom } from '../../interfaces';


interface CustomersProps {
    readonly customer: CustomRelationsResponse,
    readonly customerId: string,
    readonly dispatch: DispatchType, 
}

export class CustomerProfile extends React.Component<CustomersProps> {
    componentDidMount() {
        this.props.dispatch(getCustomerRelatedInfo(this.props.customerId))
    }   
    render() {
        const {customer} = this.props;
        if (!customer) {
            return (<Spin />)
        }
        const {name, surname, balance, transactions} = customer;
        const dataSource = transactions.map(t => ({
            key: t.id,
            accountId: t.accountId,
            amount: t.amount,
          }));
          
        const columns = [{
            title: 'AccountId',
            dataIndex: 'accountId',
            key: 'accountId',
        }, {
            title: 'Balance',
            dataIndex: 'amount',
            key: 'amount',
        }];
        return (
            <div>
                <p>Customer: {name} {surname} </p>
                <p>Balance: {balance}</p>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    } 
}

export default connect((state: State, ownParams: RoutePropsCustom) => {
    return {
        customer: state.customers.relations[ownParams.match.params.customerId],
        customerId: ownParams.match.params.customerId
    }
})(CustomerProfile)


