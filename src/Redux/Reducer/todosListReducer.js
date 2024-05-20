import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    todosList: [],
    categoriesList: [],
    statusList: [],
    severityList: [],
    sortoptions: []
};

export const todosListReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.FETCH_TODOS:
            return { ...state, todosList: action.payload };
        case REDUX_CONSTANTS.FETCH_CATEGORY_LIST:
            return { ...state, categoriesList: action.payload };
        case REDUX_CONSTANTS.FETCH_STATUS_LIST:
            return { ...state, statusList: action.payload };
        case REDUX_CONSTANTS.FETCH_SEVERITY_LIST:
            return { ...state, severityList: action.payload };
        case REDUX_CONSTANTS.FETCH_SORT_OPTIONS:
            return { ...state, sortoptions: action.payload };
        default:
            return { ...state };
    }
};