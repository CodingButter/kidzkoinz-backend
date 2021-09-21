exports.up = function (knex) {
  return knex.schema.createTable("parent_household", (table) => {
    table
      .integer("parent_id")
      .notNullable()
      .references("parent.id")
      .onDelete("CASCADE");
    table
      .integer("household_id")
      .notNullable()
      .references("household.id")
      .onDelete("CASCADE");
    table.timestamps(true, true);
    table.primary(["parent_id", "household_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("parent_housuhold");
};
