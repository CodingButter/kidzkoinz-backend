exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("child")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("child").insert([
        {
          first_name: "andrew",
          last_name: "nichols",
          avatar_id: 3,
          password: "mypassword",
          birthday: "1999-02-06",
          balance: 20,
        },
        {
          first_name: "noah",
          last_name: "englehardt",
          avatar_id: 3,
          password: "mypassword",
          birthday: "2007-09-06",
          balance: 42,
        },
        {
          first_name: "flynn",
          last_name: "hester",
          avatar_id: 3,
          password: "mypassword",
          birthday: "2013-06-16",
          balance: 17,
        },
        {
          first_name: "athena",
          last_name: "hester",
          avatar_id: 4,
          password: "mypassword",
          birthday: "2016-08-20",
          balance: 35,
        },
      ]);
    });
};
