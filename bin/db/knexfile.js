const path = require("path");
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "kidzkoinz.db"),
    },

    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
      tableName: "knex_migrations",
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
      specific: [
        "external_source",
        "avatar",
        "parent",
        "child",
        "household",
        "store",
        "product",
        "product_data",
        "saved_accomplishments",
        "parent_household",
        "child_household",
        "child_store",
        "child_favorite",
        "child_purchase",
        "child_accomplishment",
      ],
    },
  },
};
