/**
 * returns the query params from a url
 * @params url: Location
 * @returns {Object}
 * @example useQuery('http://example.com?foo=bar&baz=qux')
 */
export const useQuery = () => {
  const search = window.location.search;
  const query = {};
  if (search) {
    const params = search.substr(1).split('&');
    params.forEach(param => {
      const [key, value] = param.split('=');
      query[key] = decodeURIComponent(value);
    });
  }
  return {query};
}