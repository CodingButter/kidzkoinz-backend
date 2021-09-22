exports.up = function (knex) {
  return knex.schema.createTable("external_source", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.string("image_base_url");
    table.string("checkout_base_url");
    table.string("product_base_url");
    table.string("logo");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("external_source");
};
