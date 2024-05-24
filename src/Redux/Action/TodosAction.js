import { API_END_POINTS, CONSTANTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import axios from "axios";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";

export const fetchTodosOnSuccess = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_TODOS,
        payload: payload
    };
};

export const fetchStatusAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_STATUS_LIST,
        payload: payload
    };
};

export const fetchCategoryAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_CATEGORY_LIST,
        payload: payload
    };
};

export const fetchSeverityAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_SEVERITY_LIST,
        payload: payload
    };
};


export const fetchFilterOptionsAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_SORT_OPTIONS,
        payload: payload
    };
};

/* Old Method fetching status without filters */

// export const fetchTodos = (payload) => {
//     return async function (dispatch) {
//         dispatch(startLoaderAction());
//         let url = CONSTANTS.SERVICE_URL + API_END_POINTS.FETCH_TODOS;
//         let options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//                 "Authorization": `Bearer ${sessionStorage.getItem("token")}`
//             },
//         };
//         let response = await fetch(url, options);
//         dispatch(stopLoaderAction());
//         response = await response.json();
//         dispatch(fetchTodosOnSuccess(response));
//     };
// }; 

/* New Method fetching status with filters */

export const defaultPayload = {
    "sortBySeverity": "DESC",
    "status": "1,2,3",
    "search": '',
    "category": '1,2'
};

export const fetchTodos = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = CONSTANTS.SERVICE_URL + API_END_POINTS.FETCH_TODOS;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload ? payload : defaultPayload)
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        dispatch(fetchTodosOnSuccess(response));
    };
};

export const fetchMasters = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = CONSTANTS.SERVICE_URL + API_END_POINTS.GET_STATUSES + payload.id;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        response.forEach(item => item.selected = true)

        switch (payload.id) {
            case 1:
                dispatch(fetchSeverityAction(response));
                break;
            case 2:
                dispatch(fetchCategoryAction(response));
                break;
            case 3:
                dispatch(fetchStatusAction(response));
                break;
            case 4:
                dispatch(fetchFilterOptionsAction(response));
                break;
            default:
        }

    };
}; 