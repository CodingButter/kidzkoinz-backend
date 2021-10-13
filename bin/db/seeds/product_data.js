exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_data")
    .del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product_data").insert([
        {
          external_product_id: "B082XJRTMG",
          data: "https://m.media-amazon.com/images/I/81BTbL0W1FL._AC_SX466_.jpg",
          data_type: "small_image",
        },
        {
          external_product_id: "B082XJRTMG",
          data: "https://m.media-amazon.com/images/I/81BTbL0W1FL._AC_SX466_.jpg",
          data_type: "medium_image",
        },
        {
          external_product_id: "B082XJRTMG",
          data: "https://m.media-amazon.com/images/I/81BTbL0W1FL._AC_SX466_.jpg",
          data_type: "large_image",
        },
        {
          external_product_id: "B08CVRCFX3",
          data: "https://m.media-amazon.com/images/I/81rmbVHhVUS._AC_SX466_.jpg",
          data_type: "small_image",
        },
        {
          external_product_id: "B08CVRCFX3",
          data: "https://m.media-amazon.com/images/I/81rmbVHhVUS._AC_SX466_.jpg",
          data_type: "medium_image",
        },
        {
          external_product_id: "B08CVRCFX3",
          data: "https://m.media-amazon.com/images/I/81rmbVHhVUS._AC_SX466_.jpg",
          data_type: "large_image",
        },
        {
          external_product_id: "B07KWXZ1JN",
          data: "https://m.media-amazon.com/images/I/B07KWXZ1JN_1.jpg",
          data_type: "small_image",
        },
        {
          external_product_id: "B07KWXZ1JN",
          data: "https://m.media-amazon.com/images/I/B07KWXZ1JN_1.jpg",
          data_type: "medium_image",
        },
        {
          external_product_id: "B07KWXZ1JN",
          data: "https://m.media-amazon.com/images/I/B07KWXZ1JN_1.jpg",
          data_type: "large_image",
        },
      ]);
    });
};
