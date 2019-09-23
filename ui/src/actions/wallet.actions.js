export const CREATE_WALLET = 'CREATE_WALLET';
export const RESET_CREATE_WALLET = 'RESET_CREATE_WALLET';
export const CREATE_WALLET_SUCCESS = 'CREATE_WALLET_SUCCESS';
export const CREATE_WALLET_FAILED = 'CREATE_WALLET_FAILED';

export const createWallet = (payload) => ({
  type: CREATE_WALLET,
  payload
})

export const resetCreateWallet = () => ({
  type: RESET_CREATE_WALLET,
})

export const createWalletSuccess = (data) => ({
  type: CREATE_WALLET_SUCCESS,
  data
})

export const createWalletFailed = (error) => ({
  type: CREATE_WALLET_FAILED,
  error
})