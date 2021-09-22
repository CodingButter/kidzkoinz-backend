const { SQLDataSource } = require("datasource-sql");
class KnexDataSource extends SQLDataSource {
  getChildById(id, columns) {
    return this.knex("children").where({ id });
  }
}

module.exports = KnexDataSource;
