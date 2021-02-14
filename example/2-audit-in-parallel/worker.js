const { auditNetworkRequest } = require('../..');

module.exports = async ({ url }) => {
  return await auditNetworkRequest(url, { logLevel: 'info' });
};
