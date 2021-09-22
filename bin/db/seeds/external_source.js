exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("external_source")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("external_source").insert([
        {
          title: "Amazon",
          image_base_url: "https://m.media-amazon.com/images/I/",
          product_base_url: "https://www.amazon.com/dp/",
        },
      ]);
    });
};
