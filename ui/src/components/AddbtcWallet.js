import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Header from './Header';

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
});

class AddBtcForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      btc_address: '',
      btc_balance: ''
    }
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { btc_address, btc_balance } = this.state;
  }
  render() {
    const classes = this.props.classes;

    return (
      <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Btc Wallet
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Btc Address"
              name="btc_address"
              autoComplete="btc_address"
              onChange={(event) => this.handleChange(event, 'btc_address')}
              autoFocus
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="btc_balance"
              label="Btc Balance"
              onChange={(event) => this.handleChange(event, 'btc_balance')}
              autoComplete="btc_balance"
              required
            />
      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
          </form>
        </div>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.loginReducer.email,
  password: state.loginReducer.password
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    
  },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AddBtcForm));
