const amazonbuddy = require("amazon-buddy");
class Amazon {
  constructor(configs) {
    this.configs = configs;
    this.data = {};
  }
  async searchProducts({ keyword, category, page = 1, country }) {
    const response = await amazonbuddy.products({
      keyword,
      bulk: false,
      page,
      country,
      category,
    });
    const filteredData = response.result.map(product => {
      return {
        price: product.price.current_price,
        url: product.url,
        title: product.title,
        thumbnail: product.thumbnail,
        externalId: product.asin,
        prime: product.amazonPrime,
      };
    });
    return filteredData;
  }
  async getProductByExternalId(asin) {
    if (this.data[asin]) return this.data[asin];
    const response = await amazonbuddy.asin({ asin });
    const { result } = response;
    const productResult = result[0];

    (productResult.price = productResult.price.current_price),
      (productResult.images = productResult.images.map(image => {
        const imagePath = image.split("._")[0];
        if (!productResult.thumbnail)
          productResult.thumbnail = `${imagePath}._AC_SR38,50_.jpg`;
        return {
          small: `${imagePath}._AC_SR38,50_.jpg`,
          medium: `${imagePath}._AC_.jpg`,
          large: `${imagePath}._AC_SL1500_.jpg`,
        };
      }));
    productResult.videos = productResult.videos.map(video => {
      video.thumbnail = video.slateUrl;
      video.videoWidth = parseInt(video.videoWidth);
      video.videoHeight = parseInt(video.videoHeight);
      return video;
    });
    productResult.prime = productResult.badges.amazon_prime;
    productResult.available = productResult.item_available;
    productResult.externalId = productResult.asin;
    this.data[asin] = productResult;
    return productResult;
  }
}

module.exports = Amazon;
