export const GET_MY_DETAILS = 'GET_MY_DETAILS'
export const GET_MY_DETAILS_SUCCESS = 'GET_MY_DETAILS_SUCCESS'
export const GET_MY_DETAILS_FAILED = 'GET_MY_DETAILS_FAILED'

export const getMyDetails = () => ({
  type: GET_MY_DETAILS,
})

export const getMyDetailsSuccess = (data) => ({
  type: GET_MY_DETAILS_SUCCESS,
  data
})

export const getMyDetailsFailed = (error) => ({
  type: GET_MY_DETAILS_FAILED,
  error
})