import axios from 'axios';
import { Dispatch } from 'redux';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './actionTypes';

export interface registerProps {
    displayName: string;
    email: string;
    password: string;
}

// Register User
export const registerActionCreator = ({ displayName, email, password }: registerProps) => async (
    dispatch: Dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ displayName, email, password });

    try {
        const res = await axios.post('/api/users', body, config);
        console.log(res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: REGISTER_FAIL });
    }
};
