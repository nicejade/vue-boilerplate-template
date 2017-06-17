import Request from 'superagent'
import $q from 'q'
import _ from 'lodash'

const defaultHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function requestHandle (url, method = 'get', params = {}, query = {}, op = {}) {
  let defer = $q.defer()
  Request(method, url)
    .set(defaultHeader)
    .query(query)
    .send(params)
    .end((err, res) => {
      if (res && (res.unauthorized || res.statusCode === 401)) {
        window.location.href = '/login'
      }
      if (err) {
        defer.reject(res.text || err)
      } else if (res.type === 'application/x-msdownload') {
        redirectToIframe(res.req.url)
      } else if (res.body) {
        if (res.body.success) {
          defer.resolve(res.body.value)
        } else {
          defer.reject(res.body.message || err)
        }
      } else {
        defer.reject()
      }
    })

  return defer.promise
}

function redirectToIframe (url) {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

var res = {
  ajax: requestHandle
}

res = _.assignIn(res, {
  post: function (url, params, op) {
    return res.ajax(url, 'post', params, op)
  },
  get: function (url, query, op) {
    return res.ajax(url, 'get', {}, query, op)
  },
  put: function (url, params, op) {
    return res.ajax(url, 'PUT', params, op)
  },
  patch: function (url, params, op) {
    return res.ajax(url, 'PATCH', params, op)
  },
  delete: function (url, params, op) {
    return res.ajax(url, 'DELETE', params, op)
  },
  create: function (url, params, op) {
    return res.ajax(url, 'post', params, op)
  }
})

export default res
