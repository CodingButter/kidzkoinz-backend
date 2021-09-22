exports.up = function (knex) {
  return knex.schema.createTable("store", (table) => {
    table.increments();
    table.string("title").notNullable();
    table
      .integer("household_id")
      .notNullable()
      .references("household.id")
      .onDelete("CASCADE");
    table.integer("avatar_id").references("avatar.id").onDelete("SET NULL");
    table.integer("status").notNullable().default(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("store");
};
