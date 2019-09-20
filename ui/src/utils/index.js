export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }
  
  export const setTOLocalStorage = (key, value) => localStorage.setItem(key, value)
  export const getLocalStorage = (key, value) => localStorage.getItem(key, value);