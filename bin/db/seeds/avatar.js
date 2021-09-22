exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("avatar")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("avatar").insert([
        { title: "Man", type: 0, path: "man.png" },
        { title: "Woman", type: 0, path: "woman.png" },
        { title: "Boy", type: 1, path: "boy.png" },
        { title: "Girl", type: 1, path: "girl.png" },
        { title: "Farm", type: 2, path: "farm.png" },
        { title: "Apartment", type: 2, path: "apartment.png" },
        { title: "Toys", type: 3, path: "toys.png" },
        { title: "Books", type: 3, path: "books.png" },
        { title: "Grades", type: 4, path: "grades.png" },
        { title: "Cleaning", type: 4, path: "cleaning.png" },
      ]);
    });
};
