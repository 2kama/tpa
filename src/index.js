import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'


import App from './App'
import reducers from './store/reducers/'
import { watcherSaga } from './store/sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware]

const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(watcherSaga)


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root')
)



reportWebVitals()