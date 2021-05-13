import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../actions/actionTypes';
import { IUser } from '../../types/models/User';
import { AnyAction } from 'redux';

export interface authState {
    token: string | null;
    isAuthenticated: boolean | null;
    loading: boolean;
    user: IUser | null | undefined;
}

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};
// | IregisterUserAction |
export default function reducer(state: authState = initialState, action: AnyAction): authState {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            console.log('succeeded');
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            console.log('Failed');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return {
                ...state,
            };
    }
}
