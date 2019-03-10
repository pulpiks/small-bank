import { 
    applyMiddleware, 
    combineReducers, 
    compose, 
    createStore, 
    GenericStoreEnhancer, 
    // Dispatch as DispatchInterface 
  } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { customers, CustomersState } from '../reducers/customers'
import { connectRouter, routerMiddleware } from 'connected-react-router';
  
// export type Dispatch = DispatchInterface<State>
export type Dispatch = DispatchInterface<State>


export type DispatchInterface<S> = <NestedA>(action: NestedA|ThunkFunction<S>) => NestedA

export type GetState<S> = () => S

export type ThunkFunction<S, R = any> = (dispatch: DispatchInterface<S>, getState: GetState<S>) => R // tslint:disable-line:no-any


export interface State {
  // readonly stock: StockState,
  // readonly order: OrderState
  readonly customers: CustomersState
}

interface CustomWindow extends Window {
  readonly __REDUX_DEVTOOLS_EXTENSION__?: () => GenericStoreEnhancer
}

export const history = createBrowserHistory()

const rootReducer = combineReducers<State>({
  router: connectRouter(history),
  customers 
})

const middleware: GenericStoreEnhancer[] = [
  applyMiddleware(
    routerMiddleware(history),
    thunk,
  ),
]

if (window) {
  const customWindow: CustomWindow = window

  if (customWindow.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware.push(customWindow.__REDUX_DEVTOOLS_EXTENSION__())
  }
}

export const store = createStore<State>(
    rootReducer,
    // retrieveMiddleware(),
    compose.apply(null, middleware),
)
  