// REQ_FROM_HEADER: REQ_FROM_HEADER,
// RULE_VALUE_HEADER: RULE_VALUE_HEADER,
// MAX_AGE_HEADER: MAX_AGE_HEADER,
// ETAG_HEADER: ETAG_HEADER,
// SSL_FLAG_HEADER: SSL_FLAG_HEADER,
// FULL_URL_HEADER: FULL_URL_HEADER,
// REAL_URL_HEADER: REAL_URL_HEADER,
// CUR_RULE_HEADER: CUR_RULE_HEADER,
// REQ_ID_HEADER: REQ_ID_HEADER,
// STATUS_CODE_HEADER: STATUS_CODE_HEADER,
// LOCAL_HOST_HEADER: LOCAL_HOST_HEADER,
// HOST_VALUE_HEADER: LOCAL_HOST_HEADER,
// CUR_HOST_HEADER: CUR_HOST_HEADER,
// CUR_PROXY_HEADER: CUR_PROXY_HEADER,
// PROXY_VALUE_HEADER: PROXY_VALUE_HEADER,
// CUR_PAC_HEADER: CUR_PAC_HEADER,
// PAC_VALUE_HEADER: PAC_VALUE_HEADER,
// METHOD_HEADER: METHOD_HEADER,
// CLIENT_IP_HEADER: config.CLIENT_IP_HEAD,
// CLIENT_PORT_HEAD: CLIENT_PORT_HEAD,
// GLOBAL_VALUE_HEAD: GLOBAL_VALUE_HEAD,
// HOST_IP_HEADER: HOST_IP_HEADER,

const options = require('./options');

const noop = () => {};
const getHeader = (req, name) => {
  const value = req.headers[name];
  return value ? decodeURIComponent(value) : '';
};

exports.noop = noop;
exports.getReqId = req => getHeader(req, options.REQ_ID_HEADER);
exports.getRuleValue = req => getHeader(req, options.RULE_VALUE_HEADER);
exports.getFullUrl = req => getHeader(req, options.FULL_URL_HEADER);
exports.getRealUrl = req => getHeader(req, options.REAL_URL_HEADER);
exports.getMethod = req => getHeader(req, options.METHOD_HEADER);
exports.getClientIp = req => getHeader(req, options.CLIENT_IP_HEADER) || '127.0.0.1';
exports.getServerIp = req => getHeader(req, options.HOST_IP_HEADER);
exports.getStatusCode = req => getHeader(req, options.STATUS_CODE_HEADER);
