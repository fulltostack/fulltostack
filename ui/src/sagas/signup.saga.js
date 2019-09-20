import {
  takeEvery,
  put,
  call
} from 'redux-saga/effects'
import {
  SIGNUP
} from '../actions/actionTypes'
import {
  signupsuccess,
  signupfailed
} from '../actions/actionCreators'
import { signup } from '../constants/config'

const signupRequest = payload =>
  fetch(
    signup,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password
      })
    }
  )
    .then(res => {
      if (res.status === 201) { return res.json() }
    })
    .catch(error => {
      throw error
    })

function* signupReq(action) {
  try {
    const response = yield call(signupRequest, action.payload)
    yield put(signupsuccess(response))
  } catch (err) {
    yield put(signupfailed(err))
  }
}

export default [
  takeEvery(SIGNUP, signupReq)
]
