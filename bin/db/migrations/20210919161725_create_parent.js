exports.up = function (knex) {
  return knex.schema.createTable("parent", table => {
    table.increments();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.date("birthday").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("dashboard");
    table.float("balance").default(0);
    table.integer("avatar_id").references("avatar.id").onDelete("SET NULL");
    table.integer("status").default(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("parent");
};
