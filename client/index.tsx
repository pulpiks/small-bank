import { createElement }from 'react'
import { render } from 'react-dom'
import { Root } from './root'
import { store, history } from './store'

render(
    <Root store={ store } history={ history } />,
    document.getElementById('root'),
)
