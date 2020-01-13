
/**
 * Prefix a request with the given url.
 *
 * @param {string} url
 */
function urlPrefix(url) {
  url = url.replace(/\/+$/, '')
  return (request) => request.url = url + '/' + request.url.replace(/^\/+/, '')
}

module.exports = urlPrefix
