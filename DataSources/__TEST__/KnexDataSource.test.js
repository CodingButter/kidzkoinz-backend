const knexConfig = require("../../bin/db/knexfile")["development"];
const db = require("knex")(knexConfig);
const KnexDataSource = require("../KnexDataSource");
const logger = require("../../logger");
const knexDataSource = new KnexDataSource(db);

describe("Get Child By Id", () => {
  test("check if result is child 1", async () => {
    const {
      avatar_id,
      balance,
      birthday,
      first_name,
      id,
      last_name,
      password,
      status,
    } = await knexDataSource.getChildById(1);

    expect(avatar_id).toEqual(3);
    expect(balance).toEqual(20);
    expect(birthday).toEqual("1999-02-06");
    expect(first_name).toEqual("andrew");
    expect(id).toEqual(1);
    expect(last_name).toEqual("nichols");
    expect(password).toEqual("mypassword");
    expect(status).toEqual(1);
  });
});

describe("Get Children By a Parent id", () => {
  test("check if an array containing child 1 in child table exists", async () => {
    const children = await knexDataSource.getChildrenByParent(1);

    expect(children).toEqual([]);
    expect(Array.isArray(children)).toEqual(true);
    expect(children.length).toEqual(1);
    expect(children[0].id).toEqual(1);
  });
});
