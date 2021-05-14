import { connect } from 'react-redux';
import { IauthState } from '../../redux/reducers/authReducer';

const Dashboard: React.ComponentType<any> = ({ user, loading }) => {
    return <div>{loading ? <div>Loading</div> : <div>Hello {user.displayName}</div>}</div>;
};

const mapStateToProps = (state: { authReducer: IauthState }) => ({
    user: state.authReducer.user,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
