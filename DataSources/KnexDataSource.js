const { SQLDataSource } = require("datasource-sql");
const logger = require("../logger");
const MINUTE = 60;
class KnexDataSource extends SQLDataSource {
  getChildById(id) {
    return this.knex.select("*").from("child").where({ id });
  }

  getChildrenByParent(parent_id) {
    try {
      const householdIds = this.knex("parent_household")
        .select("household_id")
        .where("parent_id", parent_id);
      const childIds = this.knex("child_household")
        .select("child_id")
        .whereIn("household_id", householdIds);

      return this.knex("child").select().whereIn("id", childIds);
    } catch (error) {
      logger.error(error);
    }
  }
  async getParentsByChild(child_id) {
    const householdIds = this.knex("child_household")
      .select("household_id")
      .where("child_id", child_id);
    const parentIds = this.knex("parent_household")
      .select("parent_id")
      .whereIn("household_id", householdIds);
    return await this.knex("parent").whereIn("id", parentIds);
  }
}
module.exports = KnexDataSource;
