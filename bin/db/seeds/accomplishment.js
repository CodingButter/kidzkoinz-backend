exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("accomplishment")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("accomplishment").insert([
        {
          title: "Getting Good Grades",
          value: 5,
          avatar_id: 9,
          description: "For getting a good grade in math",
        },
        {
          title: "Cleaning Your Room",
          value: 2,
          avatar_id: 10,
          description: "For Cleaning You Entire Room",
        },
      ]);
    });
};
