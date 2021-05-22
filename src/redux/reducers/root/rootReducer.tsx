import { combineReducers } from 'redux';
import authReducer, { IauthState } from '../authReducer';

export interface IrootState {
    authReducer: IauthState;
}

export default combineReducers({ authReducer });
