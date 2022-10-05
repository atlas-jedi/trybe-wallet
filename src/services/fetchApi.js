const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (err) {
    return err;
  }
};

export default fetchApi;
