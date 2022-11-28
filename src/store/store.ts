import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
} from "redux";
import {
  persistStore,
  persistReducer,
  PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga";

// import { loggerMiddlewar } from "../middleware/logger"

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type TRootState = ReturnType<
  typeof rootReducer
>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig =
  PersistConfig<TRootState> & {
    whitelist: (keyof TRootState)[];
  };

export const persistConfig: ExtendedPersistConfig =
  {
    key: "root",
    storage: storage,
    whitelist: ["cart"],
  };

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// Apply middelware only in production
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware =>
  Boolean(middleware)
);

// Setup redux devtools
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composedEnhancer(
  applyMiddleware(...middleWares)
);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
