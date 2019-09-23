import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

function Wallet(props) {
  const { classes } = props;
  const { blockchain, address, balance } = props.wallet;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} component="h3" color="textSecondary">
          {`${blockchain} Wallet`}
        </Typography>
        {
          address && <Typography component="p">
            {`Address: ${address}`}
          </Typography>
        }
        {
          address && <Typography component="p">
            {`Balance: ${balance}`}
          </Typography>
        }
      </CardContent>
      <CardActions>
        { !address &&
          <Button 
            size="small" 
            onClick={() => props.goToAddWallet(blockchain)}
          >Add Wallet</Button>
        }
        {
          address && <Button 
            size="small" 
            onClick={() => props.createTransaction(blockchain)}
          >Create Transaction</Button>
        }
      </CardActions> 
    </Card>
  );
}

Wallet.propTypes = {
  classes: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  goToAddWallet: PropTypes.func.isRequired,
};

export default withStyles(styles)(Wallet);