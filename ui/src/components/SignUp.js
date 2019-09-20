import React from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signup } from '../actions/actionCreators';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

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

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      email: '',
      password: ''
    }
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password,name } = this.state;
    this.props.signup({ name, email, password });
  }
  render() {
    const classes = this.props.classes;

    if (this.props.isSignupSuccess) return <Redirect to={'/login'} />;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              autoComplete="name"
              onChange={(event) => this.handleChange(event, 'name')}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) => this.handleChange(event, 'email')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(event) => this.handleChange(event, 'password')}
              autoComplete="current-password"
            />
            {
              this.props.error && 
              <Typography component="h1" variant="h6">
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
              Sign Up
          </Button>
          </form>
        </div>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  isSignupSuccess: state.signup.isSignupSuccess,
  error: state.signup.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signup
  },
    dispatch
  );

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(withStyles(useStyles)(Signup));
