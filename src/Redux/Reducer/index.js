import { combineReducers } from "redux";
import { todosListReducer } from "./todosListReducer";
import { AlertMessageReducer } from "./AlertMessageReducer";
import { loaderReducer } from "./LoaderReducer";

export const rootReducer = combineReducers({
    todosListReducer: todosListReducer,
    AlertMessageReducer: AlertMessageReducer,
    loaderReducer: loaderReducer
})