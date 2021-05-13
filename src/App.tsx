import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//Utils
import setAuthToken from './utils/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './redux/reducers/root/reducerStore';
import { loadUserActionCreator } from './redux/actions/authAction';
//Axios
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    console.log('run');
    useEffect(() => {
        //TODO: figure out how to type this properly
        loadUserActionCreator(store.dispatch);
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Switch>
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
