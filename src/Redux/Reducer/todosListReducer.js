import { REDUX_CONSTANTS } from "../reduxConstants";

export const todosInitialState = {
    todosList: [],
    categoriesList: [],
    statusList: [],
    severityList: [],
    sortoptions: [],
    searchObj: {
        "sortBySeverity": "DESC",
        "status": "1,2,3",
        "search": '',
        "category": '1,2',
        "fromDate": '1800-01-01T12:00:00.000Z',
        "toDate": new Date(),
        "sortByDate": "DESC"
    }
};

export const todosListReducer = (state = todosInitialState, action) => {
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
            return {...state, searchObj: todosInitialState.searchObj }
        default:
            return { ...state };
    }
};