import { TEST_DATA_GET, TEST_DATA_ERROR } from '../actions/actionTypes';
import { Dispatch } from 'redux';
import axios, { AxiosError, AxiosPromise } from 'axios';

// Register User
export type TregisterActionCreator = (
    displayName: string,
    email: string,
    password: string
) => AxiosPromise<Error | AxiosError>;

export interface IgetTestDataActionSuccess {
    type: typeof TEST_DATA_GET;
    payload?: { token: string };
}

export interface IgetTestDataActionError {
    type: typeof TEST_DATA_ERROR;
    payload?: { msg: string; status: string };
}

export const getTestDataActionCreator =
    (id: string) => async (dispatch: Dispatch<IgetTestDataActionSuccess | IgetTestDataActionError>) => {
        try {
            const res = await axios.get(`/api/test/${id}`);
            dispatch({
                type: TEST_DATA_GET,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: TEST_DATA_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
        }
    };
