exports.up = function (knex) {
  return knex.schema.createTable("child_store", (table) => {
    table
      .integer("child_id")
      .notNullable()
      .references("child.id")
      .onDelete("CASCADE");
    table
      .integer("store_id")
      .notNullable()
      .references("store.id")
      .onDelete("CASCADE");
    table.primary(["child_id", "store_id"]);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("child_store");
};
