import { createElement, StatelessComponent } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { State } from './store'
import { History } from 'history'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App'
import Customers from './components/Customers'
import Customer from './components/Customer'
import Transaction from './components/Transaction'
import NoMatch from './components/Nomatch'
import { ConnectedRouter } from 'connected-react-router'

export interface Props {
  readonly history: History
  readonly store: Store<State>
}

export const Root: StatelessComponent<Props> = ({ store, history }) => (
    <Provider store={ store }>
        <ConnectedRouter history={history}>
                <App>
                    <Switch>
                        <Route
                            {...{
                                name: 'customers',
                                path: '/',
                                exact: true,
                                component: Customers
                            }}
                        />
                        <Route
                            {...{
                                name: 'customer',
                                path: '/customer/:customerId',
                                exact: true,
                                component: Customer,
                            }}
                            />
                        <Route
                            {...{
                                name: 'transaction',
                                path: '/transaction',
                                exact: true,
                                component: Transaction,
                            }}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </App>
        </ConnectedRouter>
    </Provider>
)

Root.displayName = 'Root'
