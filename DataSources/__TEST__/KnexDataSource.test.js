const Knex = require("knex");
const knexfile = require("../../bin/db/knexfile")["development"];
const KnexDatasource = require("../KnexDataSource");
const knexDataSource = new KnexDatasource(knexfile);
const knex = new Knex(knexfile);
describe("Get Child By Id", () => {
  test("check if result is child 1", async () => {
    const child = await knexDataSource.getChildById(1);
    const expectation = await knex("child").select().where({ id: 1 });
    expect(child).toEqual(expectation);
  });
});

/*describe("Get Children By a Parent id", () => {
  test("check if an array containing child 1 in child table exists", async () => {
    const children = await knexDataSource.getChildrenByParent(1);

    expect(children).toEqual([]);
    expect(Array.isArray(children)).toEqual(true);
    expect(children.length).toEqual(1);
    expect(children[0].id).toEqual(1);
  });
  
});
*/
