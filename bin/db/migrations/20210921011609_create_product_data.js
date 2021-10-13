exports.up = function (knex) {
  return knex.schema.createTable("product_data", table => {
    table.increments();
    table.string("external_product_id").notNullable();
    table.string("data").notNullable();
    table.string("data_type").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product_data");
};
