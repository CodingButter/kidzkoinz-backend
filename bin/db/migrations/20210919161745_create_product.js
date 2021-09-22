exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("external_id").notNullable();
    table
      .integer("external_source_id")
      .references("external_source.id")
      .onDelete("SET NULL");
    table.float("price").notNullable();
    table.integer("store_id").references("store.id").onDelete("SET NULL");
    table.integer("status").notNullable().default(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
