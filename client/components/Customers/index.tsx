import React, {createElement} from 'react'
import { List, Spin, Button } from 'antd'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {Dispatch as DispatchType, State} from '../../store'
import { getCustomers } from '../../selectors/getCustomers'
import { Customer as CustomerInterface} from '../../interfaces'
import { getAllCustomers } from '../../actions/customers';


interface CustomersProps {
    readonly customers: CustomerInterface[],
    readonly dispatch: DispatchType, 
}

export class Customers extends React.Component<CustomersProps> {
    componentDidMount() {
        this.props.dispatch(getAllCustomers())
    }   
    render() {
        const {customers} = this.props;
        return (
            <div>
                <p>Customers: </p>
                <List
                    dataSource={customers}
                    renderItem={(item: CustomerInterface) => (
                        <List.Item key={item.id}>
                            <Link to={`/customer/${item.id}`}>{item.name} {item.surname}</Link><br/>
                        </List.Item>
                    )}
                >
                    {!customers.length && (
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                    )}  
                </List>
                <Button href={`/transaction`}>Create account!</Button>
            </div>
        )
    } 
}

export default connect((state: State) => {
    return {
        customers: getCustomers(state),
    }
})(Customers)