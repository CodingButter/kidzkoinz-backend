class ImageSource {
  static async getImageSet(path) {
    return {
      small: path,
      medium: path,
      large: path,
    };
  }
  static async saveProductImage(externalId, imagePath) {}
}
module.exports = ImageSource;
