exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("store")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("store").insert([
        {
          title: "andrews store",
          household_id: 1,
          avatar_id: 7,
        },
        {
          title: "noahs toys",
          household_id: 2,
          avatar_id: 7,
        },
        {
          title: "flynns store",
          household_id: 3,
          avatar_id: 7,
        },
      ]);
    });
};
