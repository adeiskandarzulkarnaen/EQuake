function fetchWithProxy(url, options) {
  return fetch(`https://api.allorigins.win/raw?url=${url}`, options);
}

export default fetchWithProxy;
