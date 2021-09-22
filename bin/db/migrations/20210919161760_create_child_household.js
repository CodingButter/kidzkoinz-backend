exports.up = function (knex) {
  return knex.schema.createTable("child_household", (table) => {
    table
      .integer("child_id")
      .notNullable()
      .references("child.id")
      .onDelete("CASCADE");
    table
      .integer("household_id")
      .notNullable()
      .references("household.id")
      .onDelete("CASCADE");
    table.timestamps(true, true);
    table.primary(["child_id", "household_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("child_household");
};
