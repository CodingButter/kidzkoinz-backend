exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("saved_accomplishment")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("saved_accomplishment").insert([
        {
          title: "Getting Good Grades",
          value: 5,
          avatar_id: 9,
          household_id: 1,
          parent_id: 1,
          child_id: 1,
          description: "For getting a good grade in math",
        },
        {
          title: "Cleaning Your Room",
          value: 2,
          avatar_id: 10,
          household_id: 2,
          child_id: 2,
          parent_id: 2,
          description: "For Cleaning You Entire Room",
        },
      ]);
    });
};
