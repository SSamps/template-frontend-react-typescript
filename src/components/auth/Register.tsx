import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerActionCreator, TregisterActionCreator } from '../../redux/actions/authAction';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface Props {
    registerActionCreator: TregisterActionCreator;
    isAuthenticated: boolean | null;
}

const Register: React.FC<Props> = ({ registerActionCreator, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        emailErrorHighlight: false,
        password: '',
        password2: '',
        passwordErrorHighlight: false,
        registerError: '',
        id: 0,
    });

    const { displayName, email, password, password2, registerError, emailErrorHighlight, passwordErrorHighlight, id } =
        formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetErrorState = async () => {
        setFormData((formData) => ({
            ...formData,
            registerError: '',
            emailErrorHighlight: false,
            passwordErrorHighlight: false,
            id: 1,
        }));
    };

    const handleNotMatchingPasswordError = () => {
        setFormData({ ...formData, registerError: 'Passwords do not match', passwordErrorHighlight: true });
    };

    const handleRequestError = (err: AxiosResponse<AxiosError<any> | Error>) => {
        if (axios.isAxiosError(err) && err.response) {
            switch (err.response.status) {
                case 400:
                    setFormData({
                        ...formData,
                        registerError: 'An account already exists with that email address.',
                        emailErrorHighlight: true,
                        id: 3,
                    });
                    break;
                default:
                    console.log('returning an error with a code other than 400');
                    setFormData({ ...formData, registerError: 'Server error: Code ' + err.response.status, id: 4 });
            }
        } else {
            setFormData({ ...formData, registerError: 'Server error', id: 5 });
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('before the error state reset the id var is: ' + id + ' and formData.id is: ' + formData.id);
        console.log('resetting error state using setFormData()');
        resetErrorState();
        console.log('after the error state reset the id var is: ' + id + ' and formData.id is: ' + formData.id);
        if (password !== password2) {
            console.log('handling matches passwords');
            handleNotMatchingPasswordError();
        } else {
            console.log('calling the registerActionCreator');
            var err = await registerActionCreator(displayName, email, password);
            console.log('returned from registerActionCreator ');
            if (err) {
                console.log('handling request errors');
                handleRequestError(err);
            }
        }
        console.log('at the end of the block the id var is: ' + id + ' and formData.id is: ' + formData.id);
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Display Name'
                        name='displayName'
                        value={displayName}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className={emailErrorHighlight ? 'form-error-field' : ''}
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className={passwordErrorHighlight ? 'form-error-field' : ''}
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength={8}
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className={passwordErrorHighlight ? 'form-error-field' : ''}
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        minLength={8}
                        value={password2}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                {console.log('----------')}
                {console.log(
                    'Rerendering - the returned JSX thinks id var is: ' + id + ' and formData.id is: ' + formData.id
                )}
                {console.log('----------')}
                {<p className='form-error-message'>{registerError}</p>}
                <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { registerActionCreator })(Register);
