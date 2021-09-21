exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("parent")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("parent").insert([
        {
          first_name: "jamie",
          last_name: "nichols",
          email: "jamie337nichols@gmail.com",
          avatar_id: 1,
          password: "mypassword",
          birthday: "1989-03-28",
        },
        {
          first_name: "scott",
          last_name: "nichols",
          email: "scottsemail@gmail.com",
          avatar_id: 1,
          password: "mypassword",
          birthday: "1971-10-08",
        },
        {
          first_name: "scott",
          last_name: "nichols",
          email: "scottsemail@gmail.com",
          avatar_id: 1,
          password: "mypassword",
          birthday: "1971-10-08",
        },
        {
          first_name: "jessica",
          last_name: "hester",
          email: "jessicasemail@gmail.com",
          avatar_id: 2,
          password: "mypassword",
          birthday: "1990-04-08",
        },
      ]);
    });
};
