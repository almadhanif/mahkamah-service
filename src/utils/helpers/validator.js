const ClientError = require('../exceptions/ClientError');

module.exports = async (reqBody, bodySchema) => {
  try {
    return await bodySchema.validateAsync(reqBody);
  } catch (err) {
    throw new ClientError(err.message);
  }
};
