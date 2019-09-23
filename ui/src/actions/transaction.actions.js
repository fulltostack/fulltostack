export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
export const RESET_CREATE_TRANSACTION = 'RESET_CREATE_TRANSACTION'
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS'
export const CREATE_TRANSACTION_FAILED = 'CREATE_TRANSACTION_FAILED'

export const GET_TRANSACTION = 'GET_TRANSACTION'
export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS'
export const GET_TRANSACTION_FAILED = 'GET_TRANSACTION_FAILED'

export const createTransaction = (payload) => ({
  type: CREATE_TRANSACTION,
  payload
})

export const resetCreateTransaction = () => ({
  type: RESET_CREATE_TRANSACTION,
})

export const createTransactionSuccess = (data) => ({
  type: CREATE_TRANSACTION_SUCCESS,
  data
})

export const createTransactionFailed = (error) => ({
  type: CREATE_TRANSACTION_FAILED,
  error
})

export const getTransaction = (payload) => ({
  type: GET_TRANSACTION,
  payload
})

export const getTransactionSuccess = (data) => ({
  type: GET_TRANSACTION_SUCCESS,
  data
})

export const getTransactionFailed = (error) => ({
  type: GET_TRANSACTION_FAILED,
  error
})