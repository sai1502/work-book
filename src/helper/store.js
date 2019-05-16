import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "reducers/";

let middleware = (compose)(applyMiddleware(thunk));

export default createStore(reducers, middleware);