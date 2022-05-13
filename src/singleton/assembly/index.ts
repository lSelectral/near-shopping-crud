import { Context, PersistentUnorderedMap, u128, math } from "near-sdk-core";
import {CartProduct, Product, User, Cart} from "./model";

@nearBindgen
export class Contract {
  /**
   * Register a new user to the system.
   * @param name User Name
   * @param email User Email
   * @param password User Password
   * @param isAdmin Define if user is admin user
   * @returns Created user model
   */
  @mutateState()
  registerUser(name: string, email: string, password: string, isAdmin: bool):User{
    return User.registerUser(name, email, password, isAdmin);
  }
  
  /**
   * Login as previously created user
   * @param email User email address
   * @param password User password
   * @returns Logged in user model
   */
  @mutateState()
  loginUser(email: string, password: string): User{
    return User.loginUser(email, password);
  }

  /**
   * @param userId Id of user to logout
   * @returns info about process
   */
  @mutateState()
  logoutUser(userId: u32):string{
    return User.logoutUser(userId);
  }

  /**
   * 
   * @param userId Id of the user
   * @returns Statu of the process
   */
  @mutateState()
  deleteUser(userId: u32):string{
    return User.deleteUser(userId);
  }

  /**
   * 
   * @param userId User ID
   * @param cartName Cart name
   * @returns Cart created for user
   */
  @mutateState()
  createCartForUser(userId:u32, cartName: string):Cart{
    return User.createCartForUser(userId, cartName);
  }

  /**
   * 
   * @param userId Id of the user
   * @param cartId Id of the cart
   * @param productId Id of the product to add
   * @param amount Amount of product
   * @returns Cart with latest state
   */
  @mutateState()
  addProductToCart(userId:u32, cartId:u32, productId:u32, amount: i64):Cart{
    return Cart.addProductToCart(userId, cartId, productId, amount);
  }

  /**
   * 
   * @param userId Id of the user
   * @param cartId Id of the cart
   * @param productId Id of product to remove
   * @returns 
   */
  @mutateState()
  removeProductFromCart(userId:u32, cartId:u32, productId:u32):string{
    return Cart.removeProductFromCart(userId, cartId, productId);
  }
  
  /**
   * @returns All users
   */
  getUsers():User[]{
    return User.getUsers();
  }

  /**
   * @returns All carts from all users
   */
  getCarts():Cart[]{
    return Cart.getCarts();
  }

  /**
   * @param userId Id of the user
   * @param cartId Id of the cart
   * @returns Info about total price and transaction statu
   */
  @mutateState()
  buyCartProducts(userId:u32, cartId:u32):string{
    return Cart.buyCartProducts(userId, cartId);
  }

  /**
   * Create a new product with given parameters
   * @param userId Id of the user for authentication
   * @param name Name of product
   * @param price Price of product with calculated u128(price,1)
   * @returns Created product
   */
  @mutateState()
  createProduct(userId:u32, name: string, price: i16):Product{
    return Product.createProduct(userId, name, price);
  }

  /**
   * Update the product with given data
   * @param userId Id of the user for authentication
   * @param productId Id of product that should be update
   * @param name New name of product
   * @param price New price of product
   * @returns Updated product
   */
  @mutateState()
  updateProduct(userId:u32, productId:u32, name: string, price: i16):Product{
    return Product.updateProduct(userId, productId, name, price);
  }

  /**
   * Delete an existing product
   * @param userId Id of the user for authentication
   * @param productId Product Id to delete
   * @returns Info about process
   */
  @mutateState()
  deleteProduct(userId:u32, productId: u32):string{
    return Product.deleteProduct(userId, productId);
  }

  /**
   * @returns All products
   */
  showProducts():Product[]{
    return Product.showProducts();
  }


  /**
   * @param id Id of the product
   * @returns Product with given ID
   */
  getProductById(id: u32):Product{
    return Product.getProductById(id);
  }
}