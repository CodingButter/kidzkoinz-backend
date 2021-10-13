const KnexDataSource = require("./KnexDataSource");
const ProductSource = require("./ProductSource");
const ImageSource = require("./ImageSource");
module.exports = config => () => {
  const knexDataSource = new KnexDataSource(config.knex);
  const productSource = new ProductSource();
  return {
    knexDataSource,
    ImageSource,
    productSource,
  };
};
