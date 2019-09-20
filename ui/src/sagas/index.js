import {
  all
} from 'redux-saga/effects'

import watchsignupAction from './signup.saga'

const rootSaga = function * () {
  yield all([
    ...watchsignupAction
  ])
}

export default rootSaga
