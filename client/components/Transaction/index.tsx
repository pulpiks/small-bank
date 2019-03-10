import {createElement, PureComponent, SyntheticEvent, Dispatch} from 'react'
import {
    Button, Form, Input, Tooltip, Icon, Select, Checkbox,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import {connect} from 'react-redux';
import {Dispatch as DispatchType, State} from '../../store'
import { RoutePropsCustom, Customer } from '../../interfaces';
import {compose} from 'redux'

import { withRouter, RouteComponentProps } from 'react-router';
import { getCustomers } from '../../selectors/getCustomers';
import { createTransaction } from '../../actions/transactions';
import { getAllCustomers } from '../../actions/customers';

const FormItem = Form.Item
const Option = Select.Option
const Textarea = Input.TextArea

interface RegistrationFormState {
    confirmDirty: boolean,
    isError: boolean
}

type OwnProps = {
    // readonly onSubmit: (data: any) => any
}

interface FormTransactionProps extends FormComponentProps, OwnProps {
    readonly dispatch: DispatchType,
    // readonly customerId: string
    readonly customers: Customer[]
};


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


class FormTransaction extends PureComponent<FormTransactionProps & RouteComponentProps<{}>, RegistrationFormState> {
    customerId: string
    state = {
        confirmDirty: false,
        isError: false
    };

    componentDidMount() {
        if (!this.props.customers.length) {
            this.props.dispatch(getAllCustomers())
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err || !this.customerId) {
                return ;
            }

            console.log('Received values of form: ', values);
            const {amount} = values
            this.props.dispatch(createTransaction({
                customerId: this.customerId,
                amount,
            }))

            // this.props.dispatch(this.props.history.push(`/customer/${this.customerId}`))
        })
    }

    handleChange = (value: string) => {
        this.customerId = value
    }


    checkAmount = (rule: string, value: string, callback: (param?: string) => void): void => {
        const amount = Number(value)
        if (isNaN(amount) || amount <0 ) {
            callback('An amount must me positive number or null');
        } else {
          callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { customers } = this.props
        return (
            <Form onSubmit={this.handleSubmit} style={{textAlign: "left"}}>
                
                <FormItem {...formItemLayout}
                    label="Customers:">
                    <Select
                        style={{ width: 200 }}
                        placeholder="Select a customer"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        >
                        {customers.map((c) => <Option value={c.id} key={c.id}>{c.name} {c.surname}</Option>)}
                    </Select>
                </FormItem>
                
                <FormItem
                    {...formItemLayout}
                    label="Amount:"
                >
                {
                    getFieldDecorator('amount', {
                        rules: [{
                            message: 'Required field!',
                            }, {
                            pattern: /^\d*\.?\d*$/,
                            message: 'Must be a number',
                            }, {
                                validator: this.checkAmount,
                            },],
                    })(<Input placeholder="amount" />)
                }
                </FormItem>
                
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Proceed to transaction</Button>
                </FormItem>
            </Form>
        )
    }
}

const OrderForm = Form.create({
    name: "transaction"
})(FormTransaction);

const mapsStateToProps = (state: State, ownParams: RoutePropsCustom) => ({
    customers: getCustomers(state),
    // customerId: ownParams.match.params.customerId
})

export default compose(connect(mapsStateToProps, null), withRouter)(OrderForm);


