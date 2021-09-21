exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("parent_household")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("parent_household").insert([
        { parent_id: 1, household_id: 1 },
        { parent_id: 2, household_id: 2 },
        { parent_id: 3, household_id: 3 },
      ]);
    });
};
