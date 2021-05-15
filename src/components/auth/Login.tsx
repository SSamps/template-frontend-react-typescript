import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginActionCreator, TloginActionCreator } from '../../redux/actions/authAction';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import axios from 'axios';

interface Props {
    loginActionCreator: TloginActionCreator;
    isAuthenticated: boolean | null;
}

const Login: React.FC<Props> = ({ loginActionCreator, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        emailErrorHighlight: false,
        password: '',
        passwordErrorHighlight: false,
        loginError: '',
    });

    const { email, password, loginError, emailErrorHighlight, passwordErrorHighlight } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({ ...formData, loginError: '', emailErrorHighlight: false, passwordErrorHighlight: false });
        var err = await loginActionCreator(email, password);
        if (err) {
            if (axios.isAxiosError(err) && err.response) {
                switch (err.response.status) {
                    case 400:
                        setFormData({
                            ...formData,
                            loginError: 'Incorrect email or password',
                            emailErrorHighlight: true,
                            passwordErrorHighlight: true,
                        });
                        break;
                    default:
                        setFormData({ ...formData, loginError: 'Server error: Code ' + err.response.status });
                }
            } else {
                setFormData({ ...formData, loginError: 'Server error' });
            }
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign in to your account
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
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
                {<p className='form-error-message'>{loginError}</p>}
                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginActionCreator })(Login);
