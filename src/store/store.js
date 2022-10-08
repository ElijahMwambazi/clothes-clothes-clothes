import { compose, legacy_createStore as createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import logger from "redux-logger"
// import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"

// import { loggerMiddlewar } from "../middleware/logger"

import { rootSaga } from "./root-saga"

import { rootReducer } from "./root-reducer"


const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["cart"]
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Apply middelware only in production
const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(Boolean)


// Setup redux devtools
const composedEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)