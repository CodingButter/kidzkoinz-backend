exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("child_favorite")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("child_favorite").insert([
        { child_id: 1, product_id: 1 },
        { child_id: 1, product_id: 2 },
        { child_id: 2, product_id: 4 },
        { child_id: 3, product_id: 5 },
      ]);
    });
};
