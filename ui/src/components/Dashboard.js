import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AddBtcForm from './AddbtcWallet';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  gridspace: {
    padding: theme.spacing(24),
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.history.push("/addbtcwallet");
  }

  handleClickTransaction = () => {
    this.props.history.push("/addtransaction");
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Header />
        <Container component="main" maxWidth="xs">
          <Grid item xs={12}>
            <Typography variant="h3">Wallets</Typography>
          </Grid>
        </Container>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClick}
        >
          ADD BTC
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClickTransaction}
        >
          ADD ETC
        </Button>
        <Grid
          justify="space-between"
          container
          spacing={24}
        >
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>BTC</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>ETC</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default (withStyles(useStyles)(Dashboard));
