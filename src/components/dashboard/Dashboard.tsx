import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { IUser } from '../../types/models/User';

interface Props {
    user: IUser | null;
    loading: boolean;
}

const Dashboard: React.FC<Props> = ({ user, loading }): JSX.Element => {
    return <div>{loading ? <div>Loading</div> : user && <div>Hello {user.displayName}</div>}</div>;
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
