const knexConfig = require("./bin/db/knexfile")[process.env.NODE_ENV];
const knex = require("knex");
module.exports = {
  knex: knex(knexConfig),
};
