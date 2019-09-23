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
import { 
  createTransaction, 
  createTransactionFailed, 
} from '../actions/transaction.actions';
import { validateAddTransaction } from "../utils/validations";

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

class AddTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount:'',
      toAddress: '',
    }
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { amount, toAddress } = this.state;
    const blockchain = this.props.match.params.blockchain.toUpperCase();

    const error = validateAddTransaction({ amount, toAddress });

    if (error.length > 0) {
      this.props.createTransactionFailed(error);
    } else {
      this.props.createTransaction({ blockchain, amount, toAddress });
    }
  }

  render() {
    const classes = this.props.classes;
    const blockchain = this.props.match.params.blockchain.toUpperCase();

    if (this.props.isTransactionSuccess) return <Redirect to={'/home'} />;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Add ${blockchain} Transaction`}
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="To Address"
              name="toAddress"
              autoComplete="toAddress"
              onChange={(event) => this.handleChange(event, 'toAddress')}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="amount"
              onChange={(event) => this.handleChange(event, 'amount')}
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
              Add Transaction
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
  isTransactionSuccess: state.transactions.isTransactionSuccess,
  error: state.transactions.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createTransaction,
    createTransactionFailed,
  },
    dispatch
  );

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(withStyles(useStyles)(AddTransaction));
