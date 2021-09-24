exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("child_accomplishment")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("child_accomplishment").insert([
        {
          title: "Getting Good Grades",
          child_id: 1,
          parent_id: 1,
          household_id: 1,
          value: 5,
          avatar_id: 9,
          description: "For getting a good grade in math",
          status: 3,
        },
        {
          title: "Getting Good Grades",
          child_id: 2,
          parent_id: 2,
          household_id: 2,
          value: 10,
          avatar_id: 9,
          description: "For getting a good grade in math",
          status: 2,
        },
        {
          title: "Getting Good Grades",
          child_id: 2,
          parent_id: 2,
          household_id: 2,
          value: 10,
          avatar_id: 9,
          description: "For getting a good grade in math",
          status: 1,
        },
        {
          title: "Cleaning Your Room",
          child_id: 3,
          parent_id: 3,
          household_id: 3,
          value: 2,
          avatar_id: 10,
          description: "For Cleaning You Entire Room",
          status: 2,
        },
      ]);
    });
};
