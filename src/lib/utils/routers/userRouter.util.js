export default class User {
  constructor(User) {
    this.User = User;
    
  }

  /**
   * Find a specific user document by ID
   * @param {ObjectID} userID
   */
  findById(userID) {
    return User.findOne({ _id: userID });
  }

  /**
   * Find a list of product documents by IDs
   * @param {ObjectID[]} ids
   */
  findByIds(ids) {
    return User.find({ _id: { $in: ids } }).toArray();
  }

  /**
   * Find a list of product documents with the provided brand
   * @param {string} brandName
   * @param {MongoSort} [sort]
   */
  findByBrand(brandName, sort = {}) {
    return this.collection
      .find({ brand: brandName })
      .sort(sort)
      .toArray();
  }

  /**
   * Return a custom serialized product object
   * @param {ObjectID} productId
   */
  async serialize(productId) {
    const product = await this.findById(productId);
    const relatedIds = product.relatedProducts.map(({ _id }) => _id);
    const relatedProducts = await this.findByIds(relatedIds);

    return {
      id: product._id.toString(),
      model: product.modelNum,
      sku: `${product.brand}-${product.modelNum}`,
      title: product.name,
      brandName: product.brand,
      price: product.salePrice,
      listPrice: product.msrp,
      discount:
        product.salePrice > product.msrp
          ? product.salePrice - product.msrp
          : null,
      relatedProducts: relatedProducts.map(relatedProduct => ({
        id: relatedProduct._id.toString(),
        title: relatedProduct.name,
        brandName: relatedIds.brand
      }))
    };
  }
}