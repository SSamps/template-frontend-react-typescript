import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type TprotectedRouteProps = {
    isAuthenticated: boolean;
    loading: boolean;
    component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...routeProps }: TprotectedRouteProps) => {
    return (
        <Route
            {...routeProps}
            render={(props) =>
                !loading && !isAuthenticated ? <Redirect to='/login'></Redirect> : <Component {...props} />
            }
        />
    );
};

const mapStateToProps = (state: { authReducer: { isAuthenticated: boolean; loading: boolean } }) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
