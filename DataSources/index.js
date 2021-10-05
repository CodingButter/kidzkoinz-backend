const KnexDataSource = require("./KnexDataSource");
const ImageSource = require("./ImageSource");
module.exports = (config) => () => {
  const knexDataSource = new KnexDataSource(config.knex);
  return {
    knexDataSource,
    ImageSource,
  };
};
