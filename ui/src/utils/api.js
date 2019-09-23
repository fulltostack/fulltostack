export const postRequest = async (url, body, headers) => {
  try {
    const res = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          ...headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (res.status === 401) {
      localStorage.clear();
    }
    if (res.status >= 200 && res.status < 400) { 
      return res.json(); 
    } else {
      const response = await res.json();
      throw Error(response.reason);
    }
  } catch (error) {
    throw error
  }
};

export const getRequest = async (url, headers) => {
  try {
    const res = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          ...headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }
    );

    if (res.status >= 200 && res.status < 400) { 
      return res.json(); 
    } else {
      const response = await res.json();
      throw Error(response.reason);
    }
  } catch (error) {
    throw error
  }
}