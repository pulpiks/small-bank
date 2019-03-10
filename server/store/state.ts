import { Customer } from "../interfaces/customer";
import { Transaction } from "../interfaces/transaction";
import { Account } from "../interfaces/account";

export interface Store {
    customers: Customer[],
    transactions: Transaction[],
    accounts: Account[],
}

export const store: Store = {
    customers: [],
    transactions: [],
    accounts: [],
}