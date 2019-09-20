import {
  all
} from 'redux-saga/effects'

import watchsignupAction from './signup.saga'
import watchloginAction from './login.saga'
import watchaddbtcwalletAction from './addbtcwallet.saga'

const rootSaga = function * () {
  yield all([
    ...watchsignupAction,
    ...watchloginAction,
    ...watchaddbtcwalletAction
  ])
}

export default rootSaga
