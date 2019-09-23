import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '25px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function TransactionTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Tx Hash</TableCell>
            <TableCell>Blockchain</TableCell>
            <TableCell>FROM</TableCell>
            <TableCell>TO</TableCell>
            <TableCell>AMOUNT</TableCell>
            <TableCell>STATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map(row => {
            return (
              <TableRow key={row.txId}>
                <TableCell>{row.txId}</TableCell>
                <TableCell>{row.blockchain}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.state}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

TransactionTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionTable);