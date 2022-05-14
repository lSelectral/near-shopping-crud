import { u128, math, PersistentUnorderedMap, Context, ContractPromiseBatch } from "near-sdk-as";

export const userMap: PersistentUnorderedMap<u32, User> = new PersistentUnorderedMap<u32, User>("usersMapp");
export const productMap: PersistentUnorderedMap<u32, Product> = new PersistentUnorderedMap<u32, Product>("productsMapp");
export const cartMap: PersistentUnorderedMap<u32, Cart> = new PersistentUnorderedMap<u32, Cart>("cartsMapp");

@nearBindgen
export class User{
  public id: u32;
  public name: string;
  public email: string;
  public password: string;
  public isAdmin: bool;
  public isLoggedIn: bool;

  constructor(
    name: string,
    email: string,
    password: string,
    isAdmin: bool
  ){
    this.id = math.hash32(name);
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isLoggedIn = false;
  }

  static registerUser(name: string, email: string, password: string, isAdmin: bool):User{
    assert(name.length > 3 && name.length < 24, "Name length should be between 3 and 24");
    assert(password.length > 7 && password.length <= 24, "Password length should be between 8 and 24");

    const user = new User(name, email, password, isAdmin);
    userMap.set(user.id, user);
    return user;
  }

  static loginUser(email: string, password: string): User{
    assert(password.length > 7 && password.length <= 24, "Password length should be between 8 and 24");
    const userValues = userMap.values(0, userMap.length);

    for (let i = 0; i < userValues.length; i++) {
      const data = userValues[i];
      if (data.email == email && data.password == password){
        data.isLoggedIn = true;
        userMap.set(data.id, data);
        return data;
      }
    }
    throw new Error("Validation failed");
  }

  static logoutUser(userId: u32):string{
    const user = userMap.getSome(userId);
    user.isLoggedIn = false;
    userMap.set(userId, user);
    return `User with ${user.name} name and ${user.id} ID logged out`
  }

  static deleteUser(userId: u32):string{
    const user = userMap.getSome(userId);
    assert(user.isAdmin, "Only admin users can delete user");

    assert(userMap.contains(userId),"User with given id doesn't exist");
    userMap.delete(userId);
    return `User with ${userId} ID deleted`;
  }

  static getUsers():User[]{
    return userMap.values(0,userMap.length);
  }

  static createCartForUser(userId:u32, cartName: string):Cart{
    const cart = new Cart(userId, cartName);
    cartMap.set(cart.id, cart);
    return cart;
  }
}

@nearBindgen
export class Product{
  public productName : string;
  public price : u128;
  public id: u32;

  constructor(
    productName : string,
    price: u128,
  ){
    this.productName = productName;
    this.price = price;
    this.id = math.hash32<string>(productName);
  }

  static createProduct(userId:u32, name: string, price: i16):Product{
    const user = userMap.getSome(userId);
    assert(!productMap.contains(math.hash32(name)),"There is already a product with given name");
    assert(price > 0, "Price should be positive");
    assert(name.length > 3 && name.length < 24, "Name length should be between 3 and 24");
    assert(user.isAdmin, "Only admin users can create product");

    const product = new Product(name, new u128(price,1));
    productMap.set(product.id,product);
    return product;
  }

  static updateProduct(userId:u32, productId:u32, name: string, price: i16):Product{
    const user = userMap.getSome(userId);
    assert(price > 0, "Price should be positive");
    assert(name.length > 3 && name.length < 24, "Name length should be between 3 and 24");
    assert(productMap.contains(productId), "Given product id isn't exist");
    assert(user.isAdmin, "Only admin users can update product");

    const product = productMap.getSome(productId);
    product.productName = name;
    product.price = new u128(price,1);
    productMap.set(productId, product);

    return product;
  }

  static deleteProduct(userId:u32, productId: u32):string{
    const user = userMap.getSome(userId);
    assert(productMap.contains(productId), "Given product id isn't exist");
    assert(user.isAdmin, "Only admin users can delete product");
    productMap.delete(productId);
    return `Product with ${productId} ID deleted successfully`;
  }

  static showProducts():Product[]{
    return productMap.values(0,productMap.length);
  }

  static getProductById(id: u32):Product{
    return productMap.getSome(id);
  }
}

@nearBindgen
export class CartProduct{
  public product: Product;
  public amount: i64;
  public id: u32;

  constructor(
    product: Product,
    amount: i64
  ){
    this.product = product;
    this.amount = amount;
    this.id = product.id
  }
}

@nearBindgen
export class Cart{
  public id: u32;
  public name: string;
  public userId: u32;
  public cartProducts: CartProduct[];

  constructor(userId: u32, name: string){
    this.id = math.hash32(name) + userId;
    this.name = name;
    this.userId = userId;
    this.cartProducts = []
  }

  static addProductToCart(userId:u32, cartId:u32, productId:u32, amount: i64):Cart{
    assert(userMap.contains(userId), "User with given id isn't exist");
    assert(productMap.contains(productId), "Given product id isn't exist");
    assert(amount > 0 && amount < i64.MAX_VALUE, "Amount value should be positive and not exceed max i64 value");

    let cart = cartMap.getSome(cartId);
    const product = productMap.getSome(productId);

    cart.cartProducts.push(new CartProduct(product, amount));

    cartMap.set(cartId, cart);
    return cart;
  }

  static removeProductFromCart(userId:u32, cartId:u32, productId:u32):string{
    let cart = cartMap.getSome(cartId);

    for (let i = 0; i < cart.cartProducts.length; i++) {
      const cp = cart.cartProducts[i];
      if (cp.product.id === productId){
        cart.cartProducts.splice(cart.cartProducts.indexOf(cp),1);
        cartMap.set(cartId, cart);

        return `Cart with ${cartId} ID deleted successfully`;
      }
      throw new Error("Cart doesn't have a product with given id");
    }
    throw new Error("There is no product in the cart");
  }

  static getCarts(userId: u32):Cart[]{

    const carts = cartMap.values(0,cartMap.length);
    let userCarts: Cart[] = [];

    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i];
      if (cart.userId === userId) userCarts.push(cart);
    }

    return userCarts;
  }

  static getCartTotalPrice(cartId: u32):u128{
    const cart = cartMap.getSome(cartId);
    let totalPrice:u128 = new u128(0,0);

    for (let i = 0; i < cart.cartProducts.length; i++) {
      const cp = cart.cartProducts[i];
      let price = new u128(cp.product.price.hi*cp.amount,cp.product.price.lo);
      totalPrice = new u128(price.hi+totalPrice.hi,price.lo+totalPrice.lo);
    }
    return totalPrice;
  }

  static buyCartProducts(userId: u32, cartId: u32):string{
    const cart = cartMap.getSome(cartId);
    const promise = ContractPromiseBatch.create(Context.sender);
    promise.transfer(this.getCartTotalPrice(cartId));
    return `Cart total is: ${this.getCartTotalPrice(cartId)}`;
  }
}


class CartProductArray extends Array<CartProduct> {
  getCartProductFromProductId(productId: u32): CartProduct{
    for (let i = 0; i < this.length; i++) {
      const e = this[i];
      if (e.product.id === productId) return e;
    }
    throw new Error("Cart product couldn't be found");
  }
}