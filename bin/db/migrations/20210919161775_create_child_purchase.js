exports.up = function (knex) {
  return knex.schema.createTable("child_purchase", (table) => {
    table.integer("child_id").references("child.id").onDelete("SET NULL");
    table.integer("product_id").references("product.id").onDelete("SET NULL");
    table.float("purchase_price").notNullable();
    table.text("tracking");
    table.integer("status").default(1, "Pending Approval");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("child_purchase");
};
