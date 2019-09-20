import {
  all
} from 'redux-saga/effects'

import watchsignupAction from './signup.saga'
import watchloginAction from './login.saga'

const rootSaga = function * () {
  yield all([
    ...watchsignupAction,
    ...watchloginAction
  ])
}

export default rootSaga
