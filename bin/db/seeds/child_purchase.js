/*
  table.integer("child_id").references("child.id").onDelete("SET NULL");
    table.integer("product_id").references("product.id").onDelete("SET NULL");
    table.float("purchase_price").notNullable();
    table.text("tracking");
    table.integer("status").default(0, "Pending Approval");
*/
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("child_purchase")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("child_purchase").insert([
        { child_id: 1, product_id: 1, purchase_price: 10 },
        { child_id: 2, product_id: 3, purchase_price: 10 },
      ]);
    });
};
