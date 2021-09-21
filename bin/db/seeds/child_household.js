exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("child_household")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("child_household").insert([
        { child_id: 1, household_id: 1 },
        { child_id: 2, household_id: 2 },
        { child_id: 3, household_id: 3 },
        { child_id: 4, household_id: 3 },
      ]);
    });
};
