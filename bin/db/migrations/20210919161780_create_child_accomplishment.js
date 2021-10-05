exports.up = function (knex) {
  return knex.schema.createTable("child_accomplishment", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.integer("child_id").references("child.id").onDelete("SET NULL");
    table
      .integer("household_id")
      .references("household.id")
      .onDelete("SET NULL");
    table.integer("parent_id").references("parent.id").onDelete("SET NULL");
    table.float("value").notNullable();
    table.text("description").notNullable();
    table.integer("avatar_id").references("avatar.id").onDelete("SET NULL");
    table.integer("status").default(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("child_accomplishment");
};
