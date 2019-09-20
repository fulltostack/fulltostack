import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED
}
  from './actionTypes'

export const signup = (payload) => ({
  type: SIGNUP,
  payload
})

export const signupsuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  data
})

export const signupfailed = (error) => ({
  type: SIGNUP_FAILED,
  error
})

export const login = (payload) => ({
  type: LOGIN,
  payload
})

export const loginsuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
})

export const loginfailed = (error) => ({
  type: LOGIN_FAILED,
  error
})