const logger = require("../logger");
require("dotenv").config();

class KnexDataSource {
  constructor(knex) {
    this.knex = knex;
    this.localImageBase = process.env.LOCAL_IMAGE_PATH;
  }

  //Base Level Methods

  //Avatar
  async getAvatarById(avatar_id) {
    const [avatar] = await this.knex
      .select("*")
      .from("avatar")
      .where({ id: avatar_id });
    const { id, title, path } = avatar;
    return {
      id,
      title,
      image: this.getImageSet(`${this.localImageBase}avatars/${path}`),
    };
  }
  async getChildAvatars() {
    const avatarIds = await this.knex("avatar")
      .select("id")
      .where({ type: "CHILD" });
    return await Promise.all(
      avatarIds.map(async ({ id }) => await this.getAvatarById(id))
    );
  }
  async getParentAvatars() {
    const avatarIds = await this.knex("avatar")
      .select("id")
      .where({ type: "PARENT" });
    return await Promise.all(
      avatarIds.map(async ({ id }) => await this.getAvatarById(id))
    );
  }
  async getHouseholdAvatars() {
    const avatarIds = await this.knex("avatar")
      .select("id")
      .where({ type: "HOUSEHOLD" });
    return await Promise.all(
      avatarIds.map(async ({ id }) => await this.getAvatarById(id))
    );
  }
  async getStoreAvatars() {
    const avatarIds = await this.knex("avatar")
      .select("id")
      .where({ type: "STORE" });
    return await Promise.all(
      avatarIds.map(async ({ id }) => await this.getAvatarById(id))
    );
  }
  async getAccomplishmentAvatars() {
    const avatarIds = await this.knex("avatar")
      .select("id")
      .where({ type: "ACCOMPLISHMENT" });
    return await Promise.all(
      avatarIds.map(async ({ id }) => await this.getAvatarById(id))
    );
  }
  //Child
  async getChildById(id) {
    const [child] = await this.knex.select("*").from("child").where({ id });
    return child;
  }

  //Parent
  async getParentById(id) {
    const [parent] = await this.knex.select("*").from("parent").where({ id });
    return parent;
  }

  //Household
  async getHouseholdById(id) {
    const [household] = await this.knex
      .select("*")
      .from("household")
      .where({ id });
    return household;
  }

  //Store
  async getStoreById(id) {
    const [store] = await this.knex.select("*").from("store").where({ id });
    return store;
  }

  //Product
  async getProductById(id) {
    const [product] = await this.knex("product").where({ id });
    return product;
  }

  //Child Accomplishment
  async getChildAccomplishmentById(id) {
    const [child_accomplishment] = await this.knex
      .select("*")
      .from("child_accomplishment")
      .where({ id });
    return child_accomplishment;
  }

  //Saved Accomplishment
  async getSavedAccomplishmentById(id) {
    const [saved_accomplishment] = await this.knex
      .select("*")
      .from("saved_accomplishment")
      .where({ id });
    return saved_accomplishment;
  }

  //Relational Data

  //Children

  //Households

  // by Child
  async getHouseholdsByChildId(child_id) {
    const householdIds = this.knex("child_household")
      .select("household_id")
      .where("child_id", child_id);
    return await this.knex("household").whereIn("id", householdIds);
  }

  // By Parent
  async getHouseholdsByParentId(parent_id) {
    const householdIds = this.knex("parent_household")
      .select("household_id")
      .where("parent_id", parent_id);
    return await this.knex("household").whereIn("id", householdIds);
  }

  async getHouseholdsByStoreId(id) {
    const householdIds = this.knex("store")
      .select("household_id")
      .where({ id });
    return await this.knex("household").whereIn("id", householdIds);
  }

  async getChildrenByParentId(parent_id) {
    const householdIds = this.knex("parent_household")
      .select("household_id")
      .where("parent_id", parent_id);

    const childIds = this.knex("child_household")
      .select("child_id")
      .whereIn("household_id", householdIds);

    return await this.knex("child").select().whereIn("id", childIds);
  }

  //Child By Household
  async getChildrenByHouseholdId(household_id) {
    const childIds = this.knex("child_household")
      .select("child_id")
      .where("household_id", household_id);
    return await this.knex("child").whereIn("id", childIds);
  }

  //Parent By Child
  async getParentsByChildId(child_id) {
    const householdIds = this.knex("child_household")
      .select("household_id")
      .where("child_id", child_id);
    const parentIds = this.knex("parent_household")
      .select("parent_id")
      .whereIn("household_id", householdIds);
    return await this.knex("parent").whereIn("id", parentIds);
  }

  //Parents By Household
  async getParentsByHouseholdId(household_id) {
    const parentIds = this.knex("parent_household")
      .select("parent_id")
      .where("household_id", household_id);
    return await this.knex("parent").whereIn("id", parentIds);
  }

  //Stores By Household
  async getStoresByHouseholdId(household_id) {
    return await this.knex("store").where({ household_id });
  }

  //Stores By Parent
  async getStoresByParentId(parent_id) {
    return await this.knex("store").where({ parent_id });
  }

  //Stores by Child
  async getStoresByChildId(child_id) {
    const storeIds = this.knex("child_store")
      .select("store_id")
      .where({ child_id });
    return await this.knex("store").whereIn("id", storeIds);
  }

  //Products

  //Products by Store

  async getProductsByStoreId(store_id) {
    return await this.knex("product").where({ store_id });
  }

  async getFavoritesByChildId(child_id) {
    return await this.knex("child_favorite").where({ child_id });
  }

  async getPurchasesByChildId(child_id) {
    return this.knex("child_purchase").where({ child_id });
  }

  async getChildAccomplishmentsByChildId(child_id) {
    return await this.knex("child_accomplishment").where({ child_id });
  }

  async getChildAccomplishmentsByHouseholdId(household_id) {
    const [{ child_ids }] = await this.getChildrenByHouseholdId(household_id);
    return await this.knex
      .select("*")
      .from("child_accomplishment")
      .whereIn("child_id", child_ids);
  }

  async getChildAccomplishmentsByParentId(parent_id) {
    const children = await this.getChildrenByParentId(parent_id);
    return await this.knex
      .select("*")
      .from("child_accomplishment")
      .whereIn(
        "child_id",
        children.map(({ id }) => id)
      );
  }

  async getSavedAccomplishmentsByChildId(child_id) {
    return await this.knex
      .select("*")
      .from("saved_accomplishment")
      .where({ child_id });
  }

  async getSavedAccomplishmentsByHouseholdId(household_id) {
    const children = await this.getChildrenByHouseholdId(household_id);
    return await this.knex
      .select("*")
      .from("saved_accomplishment")
      .whereIn(
        "child_id",
        children.map(({ id }) => id)
      );
  }

  async getSavedAccomplishmentsByParentId(parent_id) {
    const children = await this.getChildrenByParentId(parent_id);
    return await this.knex
      .select("*")
      .from("saved_accomplishment")
      .whereIn(
        "child_id",
        children.map(({ id }) => id)
      );
  }
  async getLocalImagesByExternalProductId(external_product_id) {
    const images = await this.knex("product_data").where({
      data_type: "local_image",
      external_product_id,
    });
    const imageSets = images.map(({ data }) =>
      this.getImageSet(`${this.localImageBase}products/${data}`)
    );
    return imageSets;
  }

  async getImagesByExternalId(external_product_id) {
    const results = await this.knex("product_data")
      .whereIn("data_type", ["small_image", "medium_image", "large_image"])
      .where({ external_product_id })
      .orderBy("id", "asc");
    const images = [];
    for (var i = 0; i < results.length / 3; i++) {
      images.push({
        small: results[i].data,
        medium: results[i + 1].data,
        large: results[i + 2].data,
      });
    }
    return images;
  }
  async getPathExternalSourceId(path, id) {
    const [externalSource] = await this.knex("external_source").select(
      "image_base_url"
    );
    const { image_base_url } = externalSource;
    return `${image_base_url}${path}`;
  }
  getAgeFromBirthday(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getImageSet(path) {
    return {
      small: path,
      medium: path,
      large: path,
    };
  }
  //Create Household
  async createHousehold(household_data) {
    const { title, avatar_id, building, street, district, city, postcode } =
      household_data;
    const [id] = await this.knex("household").insert({
      title,
      avatar_id,
      building,
      street,
      district,
      city,
      postcode,
    });
    await this.knex("parent_household").insert({
      parent_id: household_data.parent_id,
      household_id: id,
    });

    return { id, ...household_data };
  }

  //updateHousehold
  async updateHousehold(household_data) {
    const {
      title,
      avatar_id,
      building,
      street,
      district,
      city,
      postcode,
      status,
    } = household_data;
    await this.knex("household")
      .update({
        title,
        avatar_id,
        building,
        street,
        district,
        city,
        postcode,
        status,
      })
      .where("id", household_data.id);
    return await this.knex("household").where("id", household_data.id);
  }
  //Create Store
  async createStore(store_data) {
    const { title, avatar_id, parent_id, household_id } = store_data;
    const [id] = await this.knex("store").insert({
      title,
      avatar_id,
      parent_id,
      household_id,
    });

    return { id, ...store_data };
  }

  //update Store
  async updateStore(store_data) {
    const { title, avatar_id, parent_id, household_id, status } = store_data;
    await this.knex("household")
      .update({
        title,
        avatar_id,
        parent_id,
        household_id,
        status,
      })
      .where("id", store_data.id);
    return await this.knex("store").where("id", store_data.id);
  }

  //Create Child
  async createChild(child_data) {
    var {
      first_name,
      last_name,
      avatar_id,
      birthday,
      password,
      balance,
      dashboard,
    } = child_data;
    const [id] = await this.knex("child").insert({
      first_name,
      last_name,
      avatar_id,
      birthday,
      password,
      balance,
      dashboard,
    });
    await this.knex("child_household").insert({
      child_id: id,
      household_id: child_data.household_id,
    });
    return { id, ...child_data };
  }
  async updateChild(child_data) {
    var {
      id,
      first_name,
      last_name,
      avatar_id,
      birthday,
      password,
      balance,
      dashboard,
      status,
    } = child_data;
    await this.knex("child")
      .update({
        first_name,
        last_name,
        avatar_id,
        birthday,
        password,
        dashboard,
        balance,
        status,
      })
      .where("id", id);
    return await this.getChildById(id);
  }

  //Create
  async createParent(parent_data) {
    var {
      first_name,
      last_name,
      avatar_id,
      birthday,
      password,
      balance,
      dashboard,
    } = parent_data;
    const [id] = await this.knex("parent").insert({
      first_name,
      last_name,
      avatar_id,
      birthday,
      password,
      balance,
      dashboard,
    });
    return { id, ...parent_data };
  }
  async updateParent(parent_data) {
    var {
      id,
      first_name,
      last_name,
      email,
      avatar_id,
      birthday,
      password,
      balance,
      dashboard,
      status,
    } = parent_data;
    await this.knex("parent")
      .update({
        first_name,
        last_name,
        avatar_id,
        birthday,
        password,
        email,
        dashboard,
        balance,
        status,
      })
      .where("id", id);
    return await this.getParentById(id);
  }
}
module.exports = KnexDataSource;
