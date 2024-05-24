import { combineReducers } from "redux";
import { todosListReducer } from "./todosListReducer";
import { AlertMessageReducer } from "./AlertMessageReducer";
import { loaderReducer } from "./LoaderReducer";
import { SideBarReducer } from "./SideBarReducer";
import { userDetailsReducer } from "./UserDetailsReducer";

export const rootReducer = combineReducers({
    todosListReducer: todosListReducer,
    AlertMessageReducer: AlertMessageReducer,
    loaderReducer: loaderReducer,
    SideBarReducer: SideBarReducer,
    userDetailsReducer: userDetailsReducer 
})