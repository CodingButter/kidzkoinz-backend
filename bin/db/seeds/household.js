exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("household")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("household").insert([
        { title: "nichols", avatar_id: 5 },
        { title: "jamies clan", avatar_id: 6 },
        { title: "hester", avatar_id: 5 },
      ]);
    });
};
