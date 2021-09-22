const KnexDataSource = require("./KnexDataSource");
module.exports = (config) => () => {
  const knexSource = new KnexDataSource(config.knex[process.env.NODE_ENV]);
  return {
    knexSource,
  };
};
