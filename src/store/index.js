import { combineReducers, applyMiddleware, compose } from "redux"
import { legacy_createStore as createStore} from 'redux'
import createSagaMiddleware from "redux-saga"

// import loginSaga from "../sagas/login"
// import loginReducer from "../reducers/login"
import apiReducer from "../reducers/api"
// import apiSaga from "../sagas/api"
//import modalsReducer from "../reducers/modals"


const reducer = combineReducers({//login: loginReducer,
                                api: apiReducer,
                                //modals: modalsReducer,
                              })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

//sagaMiddleware.run(loginSaga)
// sagaMiddleware.run(apiSaga)

export default store