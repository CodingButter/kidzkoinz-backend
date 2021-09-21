exports.up = function (knex) {
  return knex.schema.createTable("household", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.integer("avatar_id").references("avatar.id").onDelete("SET NULL");
    table.integer("status").notNullable().default(1);
    table.string("building");
    table.string("number");
    table.string("street");
    table.string("district");
    table.string("city");
    table.string("postcode");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("household");
};
