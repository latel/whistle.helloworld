const util = require('./util');

let reqIdList = [];
const reqData = {};
const MAX_BUF_SIZE = 600;
const MIN_BUF_SIZE = 500;
const COUNT = 50;

const updateStatus = (req, serverName) => {
  const reqId = util.getReqId(req);
  let item = reqData[reqId];
  if (!item) {
    item = {
      reqId,
      method: util.getMethod(req),
      url: util.getFullUrl(req),
      clientIp: util.getClientIp(req),
      ruleValue: util.getRuleValue(req),
      servers: {},
    };
    reqData[reqId] = item;
    reqIdList.push(reqId);
    let len = reqIdList.length;
    if (len > MAX_BUF_SIZE) {
      len -= MIN_BUF_SIZE;
      const removedIds = reqIdList.slice(0, len);
      removedIds.forEach(id => delete reqData[id]);
      reqIdList = reqIdList.slice(len);
    }
  }
  item.servers[serverName] = 1;
  item.statusCode = util.getStatusCode(req);
  item.serverIp = util.getServerIp(req);
};

exports.arriveStatsServer = req => updateStatus(req, 'statsServer');
exports.arriveResStatsServer = req => updateStatus(req, 'resStatsServer');
exports.arriveRulesServer = req => updateStatus(req, 'rulesServer');
exports.arriveServer = req => updateStatus(req, 'server');
exports.arriveResRulesServer = req => updateStatus(req, 'resRulesServer');
exports.arriveTunnelRulesServer = req => updateStatus(req, 'tunnelRulesServer');
exports.arriveTunnelServer = req => updateStatus(req, 'tunnelServer');

exports.getReqList = (startReqId, count) => {
  count = count > 0 ? count : COUNT;
  let index = 0;
  if (startReqId) {
    index = reqIdList.indexOf(startReqId) + 1;
  } else {
    index = Math.max(0, reqIdList.length - count);
  }
  const result = reqIdList.slice(index, index + count);
  return result.map(id => reqData[id]);
};
