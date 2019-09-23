import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { userLogout } from '../../actions/actionCreators';
import { getMyDetails } from '../../actions/user.actions';
import { getTransaction } from '../../actions/transaction.actions';
import Header from './Header';
import TransactionTable from './TransactionTable';
import Wallets from './Wallets';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  table: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getMyDetails();
    this.props.getTransaction();
  }

  goToLogin = () => {
    this.props.userLogout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Header goToLogin={this.goToLogin}/>
        <Wallets 
          history={this.props.history} 
          wallets={this.props.user.wallets}
          createWalletStarted={this.props.createWalletStarted}
          createWallet={this.props.createWallet}
        />
        <TransactionTable transactions={this.props.transactions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  transactions: state.transactions.transactions
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getMyDetails,
    getTransaction,
    userLogout,
  },
    dispatch
  );

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(withStyles(useStyles)(Dashboard));
