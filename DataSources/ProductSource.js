const Amazon = require("./productSources/Amazon");

class ProductSources {
  constructor() {
    this.amazon = new Amazon();
  }

  async searchProducts({ keyword, category, page, country }) {
    return await this.amazon.searchProducts({
      keyword,
      category,
      page,
      country,
    });
  }
  async getProductByExternalId(id) {
    return await this.amazon.getProductByExternalId(id);
  }
}
module.exports = ProductSources;
