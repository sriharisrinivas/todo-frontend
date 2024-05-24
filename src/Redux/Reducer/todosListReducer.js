import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    todosList: [],
    categoriesList: [],
    statusList: [],
    severityList: [],
    sortoptions: [],
    searchObj: {
        "sortBySeverity": "DESC",
        "status": "1,2,3",
        "search": '',
        "category": '1,2'
    }
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
        case REDUX_CONSTANTS.UPDATE_FILTER_OBJ:
            return { ...state, searchObj: action.payload };
        case REDUX_CONSTANTS.CLEAR_FILTERS:
            return {...state, searchObj: initialState.searchObj }
        default:
            return { ...state };
    }
};