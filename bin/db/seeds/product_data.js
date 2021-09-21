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
          data: "B082XJRTMG_1.jpg",
          data_type: "local_image",
        },
        {
          external_product_id: "B082XJRTMG",
          data: "81BTbL0W1FL._AC_SX466_.jpg",
          data_type: "remote_image",
        },
        {
          external_product_id: "B08CVRCFX3",
          data: "B08CVRCFX3_1.jpg",
          data_type: "local_image",
        },
        {
          external_product_id: "B08CVRCFX3",
          data: "81rmbVHhVUS._AC_SX466_.jpg",
          data_type: "remote_image",
        },
        {
          external_product_id: "B07KWXZ1JN",
          data: "B07KWXZ1JN_1.jpg",
          data_type: "local_image",
        },
        {
          external_product_id: "B07KWXZ1JN",
          data: "618TKaktSIL._AC_SX466_.jpg",
          data_type: "remote_image",
        },
      ]);
    });
};
