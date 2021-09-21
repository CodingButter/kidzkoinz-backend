const knex = require("knex");
const KnexDataSource = require("./KnexDataSource");
module.exports = (config) => () => {
  const knexSource = new KnexDataSource(
    knex(config.knex[process.env.NODE_ENV])
  );
  return {
    knexSource,
  };
};
