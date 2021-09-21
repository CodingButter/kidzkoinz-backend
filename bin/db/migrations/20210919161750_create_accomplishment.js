exports.up = function (knex) {
  return knex.schema.createTable("accomplishment", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.float("value").notNullable();
    table.text("description").notNullable();
    table
      .integer("household_id")
      .references("household.id")
      .onDelete("SET NULL");
    table.integer("avatar_id").references("avatar.id").onDelete("SET NULL");
    table.integer("status").notNullable().default(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("accomplishment");
};
