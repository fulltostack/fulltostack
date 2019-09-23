import React from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createWallet, createWalletFailed } from '../actions/wallet.actions';
import { validateAddWallet } from "../utils/validations";

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  },
});

class AddWallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balance:'',
      address: '',
    }
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { balance, address } = this.state;
    const blockchain = this.props.match.params.blockchain.toUpperCase();

    const error = validateAddWallet({ balance, address });

    if (error.length > 0) {
      this.props.createWalletFailed(error);
    } else {
      this.props.createWallet({ blockchain, balance, address });
    }
  }

  render() {
    const classes = this.props.classes;
    const blockchain = this.props.match.params.blockchain.toUpperCase();

    if (this.props.isWalletCreated) return <Redirect to={'/home'} />;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Add ${blockchain} Wallet`}
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Address"
              name="address"
              autoComplete="address"
              onChange={(event) => this.handleChange(event, 'address')}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="balance"
              label="Balance"
              name="balance"
              autoComplete="balance"
              onChange={(event) => this.handleChange(event, 'balance')}
            />
            {
              this.props.error && 
              <Typography className={classes.error} component="h1" variant="h6">
                {this.props.error}
              </Typography>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Wallet
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => this.props.history.push('/home')}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  isWalletCreated: state.wallet.isWalletCreated,
  error: state.wallet.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createWallet,
    createWalletFailed,
  },
    dispatch
  );

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(withStyles(useStyles)(AddWallet));
