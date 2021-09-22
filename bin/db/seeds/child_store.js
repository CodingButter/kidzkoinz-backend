exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("child_store")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("child_store").insert([
        { child_id: 1, store_id: 1 },
        { child_id: 2, store_id: 2 },
        { child_id: 3, store_id: 3 },
        { child_id: 4, store_id: 3 },
      ]);
    });
};
