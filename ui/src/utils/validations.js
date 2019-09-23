const validateUsername = (username) => {
  const regex = /^[a-zA-Z]+$/;
  return username.match(regex) && username.length >= 3 && username.length <= 30;
}

const validateEmail = (email) => {
  const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return email.match(regex);
}

const validatePassword = (password) => {
  const regex = /^[a-zA-Z0-9]{3,30}$/;
  return password.match(regex);
}

const validateString = (text) => {
  return text && text.length > 0;
}

const validateNumber = (num) => {
  return num && !isNaN(num);
}

const signupValidation = {
  name: validateUsername,
  email: validateEmail,
  password: validatePassword,
};

const loginValidation = {
  email: validateEmail,
  password: validatePassword,
};

const transactionValidation = {
  amount: validateNumber,
  toAddress: validateString,
};

const walletValidation = {
  address: validateString,
  balance: validateNumber,
};

export const validateSignup = (signup) => {
  let error = '';
  Object.keys(signup).forEach(key => {
    if (!signupValidation[key](signup[key])) {
      error = `Invalid ${key}!`;    
    }
  });
  return error;
}

export const validateLogin = (signup) => {
  let error = '';
  Object.keys(signup).forEach(key => {
    if (!loginValidation[key](signup[key])) {
      error = `Invalid ${key}!`;    
    }
  });
  return error;
}

export const validateAddWallet = (wallet) => {
  let error = '';
  Object.keys(wallet).forEach(key => {
    if (!walletValidation[key](wallet[key])) {
      error = `Invalid ${key}!`;    
    }
  });
  return error;
}

export const validateAddTransaction = (transaction) => {
  let error = '';
  Object.keys(transaction).forEach(key => {
    if (!transactionValidation[key](transaction[key])) {
      error = `Invalid ${key}!`;    
    }
  });
  return error;
}

