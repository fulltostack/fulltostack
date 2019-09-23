import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Wallet from './Wallet';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

class Wallets extends React.Component {

  goToAddWallet = (blockchain) => {
    this.props.history.push(`/addWallet/${blockchain}`);
  }

  createTransaction = (blockchain) => {
    this.props.history.push(`/addTransaction/${blockchain}`);
  }

  render() {
    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div className={classes.paper}>
          {
            this.props.wallets.map(wallet => <Wallet 
              key={wallet.blockchain}
              wallet={wallet} 
              goToAddWallet={this.goToAddWallet}
              createTransaction={this.createTransaction}
            />)
          }
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Wallets);
