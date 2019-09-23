import { combineReducers } from 'redux';
import signup from './signup.reduer';
import login from './login.reducer';
import user from './user.reducer';
import transactions from './transactions.reducer';
import wallet from './wallet.reducer';

export default combineReducers({
  signup,
  login,
  user,
  transactions,
  wallet,
});
