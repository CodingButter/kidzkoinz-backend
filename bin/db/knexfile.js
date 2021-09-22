module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: `kidzkoinz.db`,
    },
    useNullAsDefault: true,
    migrations: {
      directory: "migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "seeds",
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
