import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/actionTypes';
import { AnyAction } from 'redux';

export interface authState {
    isAuthenticated: boolean | null;
    loading: boolean;
    user: string | null;
}

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function reducer(state: authState = initialState, action: AnyAction) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            console.log('succeeded');
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
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
