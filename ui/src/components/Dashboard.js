import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from './Header';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AddBtcForm from './AddbtcWallet';


const useStyles = theme => ({
  root1: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
            <Typography variant="h5">Wallets</Typography>
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
        <Container component="main" maxWidth="xs">
          <Grid item xs={12}>
            <Typography variant="h5">Transactions</Typography>
          </Grid>
        </Container>
        <Paper className={classes.root1}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>From Address</TableCell>
                <TableCell align="right">To Address</TableCell>
                <TableCell align="right">Transaction Type</TableCell>
                <TableCell align="right">State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default (withStyles(useStyles)(Dashboard));
