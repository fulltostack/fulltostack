export const API_HOST = 'http://localhost:3001';

export const signup = `${API_HOST}/users/signup`;
export const login = `${API_HOST}/users/signin`;
export const userDetail = `${API_HOST}/users/me`;
export const addTransaction = `${API_HOST}/transactions`;
export const getTransactions = `${API_HOST}/transactions?count=100`;

export const addWallet = blockchain => `${API_HOST}/wallets/${blockchain}`;

export const AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';
