exports.up = function (knex) {
  return knex.schema.createTable("avatar", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.string("path").notNullable();
    table.integer("type").notNullable();
    table.integer("status").notNullable().default(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("avatar");
};
