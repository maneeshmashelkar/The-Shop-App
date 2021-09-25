class Product {
  constructor(
    id,
    ownerId,
    ownerpushToken,
    title,
    imageUrl,
    description,
    price
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerpushToken;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Product;
