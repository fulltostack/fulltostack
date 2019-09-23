import {
  all
} from 'redux-saga/effects'

import watchsignupAction from './signup.saga'
import watchloginAction from './login.saga'
import watchWalletAction from './wallet.saga'
import watchUserAction from './user.saga'
import watchTransactionAction from './transaction.saga'

const rootSaga = function * () {
  yield all([
    ...watchsignupAction,
    ...watchloginAction,
    ...watchWalletAction,
    ...watchUserAction,
    ...watchTransactionAction,
  ])
}

export default rootSaga
