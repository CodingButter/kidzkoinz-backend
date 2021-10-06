exports.up = function (knex) {
  return knex.schema.createTable("child", table => {
    table.increments();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.date("birthday").notNullable();
    table.string("password").notNullable();
    table.integer("avatar_id").references("avatar.id").onDelete("SET NULL");
    table.float("balance").default(0);
    table.integer("status").default(1);
    table.string("dashboard");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("child");
};
