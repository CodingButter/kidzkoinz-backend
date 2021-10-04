exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("avatar")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("avatar").insert([
        { title: "Man", type: "PARENT", path: "man.png" },
        { title: "Woman", type: "PARENT", path: "woman.png" },
        { title: "Boy", type: "CHILD", path: "boy.png" },
        { title: "Girl", type: "CHILD", path: "girl.png" },
        { title: "Farm", type: "HOUSEHOLD", path: "farm.png" },
        { title: "Apartment", type: "HOUSEHOLD", path: "apartment.png" },
        { title: "Toys", type: "STORE", path: "toys.png" },
        { title: "Books", type: "STORE", path: "books.png" },
        { title: "Grades", type: "ACCOMPLISHMENT", path: "grades.png" },
        { title: "Cleaning", type: "ACCOMPLISHMENT", path: "cleaning.png" },
      ]);
    });
};
