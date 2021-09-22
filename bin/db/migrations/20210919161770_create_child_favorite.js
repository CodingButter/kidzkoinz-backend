exports.up = function (knex) {
  return knex.schema.createTable("child_favorite", (table) => {
    table
      .integer("child_id")
      .notNullable()
      .references("child.id")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .notNullable()
      .references("product.id")
      .onDelete("CASCADE");
    table.primary(["child_id", "product_id"]);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("child_favorite");
};
