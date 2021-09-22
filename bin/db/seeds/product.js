exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product").insert([
        {
          title: "Bunch O Balloons",
          description: "Bunch O Balloons Description",
          external_id: "B08CVRCFX3",
          external_source_id: 1,
          price: 10,
          store_id: 1,
        },
        {
          title: "Hoverboard",
          description: "Hoverboard Description",
          external_id: "B07KWXZ1JN",
          external_source_id: 1,
          price: 10,
          store_id: 1,
        },
        {
          title: "Bunch O Balloons",
          description: "Bunch O Bolloons Description",
          external_id: "B08CVRCFX3",
          external_source_id: 1,
          price: 10,
          store_id: 2,
        },
        {
          title: "Hoverboard",
          description: "Hoverboard Description",
          external_id: "B07KWXZ1JN",
          external_source_id: 1,
          price: 15,
          store_id: 2,
        },
        {
          title: "Laser Tag Set",
          description: "Laser Tag Set Description",
          external_id: "B082XJRTMG",
          external_source_id: 1,
          price: 10,
          store_id: 3,
        },
        {
          title: "Laser Tag Set",
          description: "Laser Tag Set Description",
          external_id: "B082XJRTMG",
          external_source_id: 1,
          price: 20,
          store_id: 1,
        },
      ]);
    });
};
