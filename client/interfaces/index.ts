import { RouteComponentProps } from 'react-router';

export interface RoutePropsCustom extends RouteComponentProps<{
    readonly customerId: string
}> {}

export interface Customer {
    readonly name: string,
    readonly surname: string,
    readonly id: string,
}

export interface Account {
    readonly id: string,
    readonly customerId: string,
}

export interface Transaction {
    readonly id: string,
    readonly accountId: string,
    readonly amount: number,
}
  