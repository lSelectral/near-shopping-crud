# NEAR SHOPPING WEB3 API

This project provides a decentralized Web3 api interface for online shopping. App runs fully on the Near blockchain with smart contracts. Users can create account, from that account can login/logout. Can create different carts for specific purpose like, breakfast, dinner, technology etc. Users can add specific product to this carts and manage their shopping experience seamlessly.

[LOOM DEMO VIDEO](https://www.loom.com/share/a38053636dc740d38ddbe04e695c0574)

[![Near Shopping App](https://cdn.loom.com/sessions/thumbnails/a38053636dc740d38ddbe04e695c0574-with-play.gif)](https://www.loom.com/share/a38053636dc740d38ddbe04e695c0574)





1. [ FEATURES ](#features)
2. [ NEAR SPECS ](#near-specs)
3. [ HOW TO RUN](#how-to-run)
4. [ File Breakdown](#project-filefolder-breakdown)
5. [ Scripts Breakdown](#scripts-breakdown)
	-	[Product Scripts](#product-scripts)
	-	[User Scripts](#user-scripts)
	-	[Cart Scripts](#cart-scripts)
6. [Function Breakdown](#function-breakdown)
7. [MODEL.TS File Explanation](#modelts)
	-	[User Class](#user-class)
	-	[Product Class](#product-class)
	-	[Cart Product Class](#cart-product-class)
	-	[Cart Class](#cart-class)


> ## Features

- Product --> view
- Product --> create/update/delete (ADMIN ONLY)
- User -----> account register/login/logout/view/delete
- Cart -----> create/update/delete/view
- Buy ------> products in the cart

---

> ## Near Specs 

- All data store in the  Near Blockchain persistent storage. (Models are marked as `@nearBindgen` for serialization)
- All scripts run as smart contract.
- Assert statements protect the contracts from invalid inputs.
- Only admin privileged users, can **create/update/delete** product

---

> This project is the derivative work of my previous project [Teleperformance Shopping App](https://github.com/lSelectral/Teleperformance_Shopping_App) which is made by ASP.NET Web API, EF Core, MSSQL, React and Redux. I recreated the most of the API in the blockchain.

---

## How to Run

1. Clone the repo
```
gh repo clone lSelectral/near-shopping-crud
```
2. Open the `bash` terminal in the project main directory.
3. Run `yarn` or `npm install` for installing required node modules from `package.json`
4. Run `yarn build:release` or `npm run build:release`
5. For deploying the contract, run `production-deploy.sh` script, which located in the **`./scripts/production-deploy.sh`**.
6. After step 5, command line will show the how to export **CONTRACT** environment variable for different OS.
7. If all above steps completed, you can run scripts from `./scripts/product`,  `./scripts/user` and  `./scripts/cart`.
8. For running scripts, in the bash terminal, run `sh [SCRIPT]`
Ex: `sh scripts/product/create-product.sh` 

---

## Project File/Folder Breakdown

> scripts

- Contains the scripts for running the contracts from **Near CLI**

> src/singleton/assembly/index.ts

- Contains the smart contract implemantation of the models and its methods

Index file needs no explanation. It just implements the methods and classes in model.ts file which explained later.

> src/singleton/assembly/model.ts

- Contains the serializable models and their methods for **CRUD** operations

```txt
near-shopping-crud
├── src                       
│   ├── singleton
│   │   ├─assembly
│   │   ├── index.ts    --> Entry point for smart contracts
│   │   └── model.ts    --> Models and CRUD functions used in index.ts
│   scripts
│   │── cart							--> Cart smart contract near-cli shell script
│   │   │── add-product-to-cart.sh			
│   │   │── buy-cart-products.sh
│   │   │── get-carts.sh
│   │   │── remove-product-from-cart.sh
│   │── product  						--> Product smart contract near-cli shell script
│   │   │── show-products.sh
│   │   │── get-product-by-id.sh
│   │   │── create-product.sh
│   │   │── update-product.sh
│   │   │── delete-product.sh
│   │── user  							--> User smart contract near-cli shell script
│   │   │── create-cart-for-user.sh
│   │   │── delete-user.sh
│   │   │── get-users.sh
│   │   │── login-user.sh
│   │   │── logout-user.sh
│   │   │── register-user.sh
│   │── dev-deploy.sh  
│   │── production-deploy.sh  
│   │── UNIFIED_SCRIPTS.sh  			--> Includes all smart contract view and call near-cli scripts
│─────────────────────────────────────────────────────────
```

---

## Scripts Breakdown

near command has `$` prefix because, in windows, it doesn't recognized as global variable. So it defined as environment variable by its path.

- Ex: `export near="C:\Users\Administrator\AppData\Roaming\npm\near.cmd"`

### Product Scripts

---

> **show-products.sh**

- Description: **Display all products**
- Function Type: `View`
- Returns: `All products as Product[]`
- Args: `{}`

- Ex: `$near view $CONTRACT showProducts`

---

> **get-product-by-id.sh**

- Description: **Retrieve single products by its id**
- Function Type: `View`
- Returns: `Product as <Product>`
- Args:
	- id : `u32`

- Ex: `$near view $CONTRACT getProductById '{"id": 538052379}'`

---

> **create-product.sh**

- Description: **Create a new product**
- Function Type: `Call`
- Returns: `Product as <Product>`
- Args:
	- userId : `u32` : Id of the user for authentication
	- name : `string` : Name of product
	- price : `i16` : Price of product

- Ex: `$near call $CONTRACT createProduct '{"userId": 4282263961, "name": "Bread", "price": 36}' --account_id $CONTRACT`

---

> **update-product.sh**

- Description: **Update an existing product**
- Function Type: `Call`
- Returns: `Product as <Product>`
- Args:
	- userId : `u32` : Id of the user for authentication
	- productId : `u32` : Id of the product for update
	- name : `string` : Name of product
	- price : `i16` : Price of product

- Ex: `$near call $CONTRACT updateProduct '{"userId": 4282263961, "productId": 538052379, "name": "CAKE", "price": 9}' --account_id $CONTRACT`

---

> **delete-product.sh**

- Description: **Delete an existing product**
- Function Type: `Call`
- Returns: `Delete statu as <string>`
- Args:
	- userId : `u32` : Id of the user for authentication
	- productId : `u32` : Id of the product for delete

- Ex: `$near call $CONTRACT deleteProduct '{"userId": 4282263961, "productId": 538052379}' --account_id $CONTRACT`

---

### User Scripts

> **create-cart-for-user.sh**

- Description: **Create a cart for the user**
- Function Type: `Call`
- Returns: `Cart as <Cart>`
- Args:
	- userId : `u32` : Id of the user for assigning the cart
	- cartName : `string` : Name of the shopping cart

- Ex: `$near call $CONTRACT createCartForUser '{"userId": 4282263961, "cartName": "lunch"}' --account_id $CONTRACT`

---

> **delete-user.sh**

- Description: **Delete an existing user**
- Function Type: `Call`
- Returns: `Delete statu as <string>`
- Args:
	- userId : `u32` : Id of the user to delete

- Ex: `$near call $CONTRACT deleteUser '{"userId": 4282263961}' --account_id $CONTRACT`

---

> **get-users.sh**

- Description: **Display all the users**
- Function Type: `View`
- Returns: `All users as <User[]>`
- Args: `{}`

- Ex: `$near view $CONTRACT getUsers`

---

> **login-user.sh**

- Description: **Login with user credentials and change login statu to `true`**
- Function Type: `Call`
- Returns: `User as <User>`
- Args:
	- email : `string` : Email address of the user
	- password : `string` : Password of the user

- Ex: `$near call $CONTRACT loginUser '{"email":"dev.selectra@gmail.com", "password": "neardevselectra"}' --account_id $CONTRACT`

---

> **logout-user.sh**

- Description: **Logout and change login statu to `false`**
- Function Type: `Call`
- Returns: `Logout statu as <string>`
- Args:
	- userId : `u32` : Id of user to logout

- Ex: `$near call $CONTRACT logoutUser '{"userId": 4282263961}' --account_id $CONTRACT`

- Logout and change login statu to **false**

---

> **register-user.sh**

- Description: **Register and create new user in the persistent storage**
- Function Type: `Call`
- Returns: `User as <User>`
- Args:
	- name : `string` : Name of the user
	- email : `string` : Email of the user
	- password : `string` : Password of the user
	- isAdmin : `bool` : Assign, if the user should be admin or not

- Ex: `$near call $CONTRACT registerUser '{"name":"Recep Çiftçi", "email":"dev.selectra@gmail.com", "password": "neardevselectra", "isAdmin": true}' --account_id $CONTRACT`

---

### Cart Scripts

> **add-product-to-cart.sh**

- Description: **Add a product to the user cart**
- Function Type: `Call`
- Returns: `Cart as <Cart>`
- Args:
	- userId : `u32` : Id of the user
	- cartId : `u32` : Id of the cart
	- productId : `u32` : Id of product to add
	- amount : `i64` : Amount of product to add

- Ex: `$near call $CONTRACT addProductToCart '{"userId": 4282263961, "cartId": 4089149924, "productId": 538052379, "amount": "100"}' --account_id $CONTRACT`

---

> **buy-cart-products.sh**

- Description: **Buy all the products from user list. Retrieve total amount**
- Function Type: `Call`
- Returns: `Cart total price as <string>`
- Args:
	- userId : `u32` : Id of the user
	- cartId : `u32` : Id of the cart

- Ex: `$near call $CONTRACT buyCartProducts '{"userId": 4282263961, "cartId": 4089149924}' --account_id $CONTRACT`

---

> **get-carts.sh**

- Description: **Display all the carts from all users**
- Function Type: `View`
- Returns: `All carts as <Cart[]>`
- Args:
	- userId : `u32` : Id of the user

- Ex: `$near view $CONTRACT getCarts '{"userId": 4282263961}'`

---

> **remove-product-from-cart.sh**

- Description: **Remove a product from cart**
- Function Type: `Call`
- Returns: `Statu update as <string>`
- Args:
	- userId : `u32` : Id of the user
	- cartId : `u32` : Id of the cart
	- productId : `u32` : Id of the product

- Ex: `$near call $CONTRACT removeProductFromCart '{"userId": 4282263961, "cartId": 4089149924, "productId": 538052379}' --account_id $CONTRACT `

---

## FUNCTION BREAKDOWN

This sections describes the each function, what it does, how it works.

> ### model.ts

Model file, contains the classes and their respective methods for crud operation for usage in the smart contracts in the `index.ts` file.

---

Model class has 3 class level variable exported that stores data in the blockchain.

```
// Store users
export const userMap: PersistentUnorderedMap<u32, User>
// Store products
export const productMap: PersistentUnorderedMap<u32, Product>
// Store carts
export const cartMap: PersistentUnorderedMap<u32, Cart>
```

---

---

> ### User Class

User class defined for managing the users in application. Users have access to login, logout, register, creating new cart and adding/removing product to cart. Users divided to 2 as Standard and Admin. Only admin priveledged users can create/delete/update product(s).

```
public id: u32;
public name: string;
public email: string;
public password: string;
public isAdmin: bool;
public isLoggedIn: bool;
```

---

Register user class, creates a new user with given values. Admin access can be obtained by parameter for demo purposes.

```
static registerUser(name: string, email: string, password: string, isAdmin: bool):User{}
```

---

Login user, provides user to login and use functionalities available.
This method updates the user `isLoggedIn` statu to `true`.

```
static loginUser(email: string, password: string): User{}
```

---

Logout, change to user `isLoggedIn` statu to `false`

```
static logoutUser(userId: u32):string{}
```

---

Delete user function is only accessible to admin for deleting user from the blockchain storage permanently.
>[ADMIN ONLY]

```
static deleteUser(userId: u32):string{}
```

---

Retrieve all users from the persistent storage

```
static getUsers():User[]{}
```

---

Create a new cart for the user, with given name.

```
static createCartForUser(userId:u32, cartName: string):Cart{}
```

---

---

> #### Product Class

Product class defined for storing, creating, updating and deleting the products by admin. Users can only view products and add this product to the cart.

```
public productName : string;
public price : u128;
public id: u32;
```

---

Create a new product.
>[ADMIN ONLY]

```
static createProduct(userId:u32, name: string, price: i16):Product{}
```

---

Update the existing product.
>[ADMIN ONLY]

```
static updateProduct(userId:u32, productId:u32, name: string, price: i16):Product{}
```

---

Delete the existing product.
>[ADMIN ONLY]

```
static deleteProduct(userId:u32, productId: u32):string{}
```

---

Retrieve the all products.

```
static showProducts():Product[]{
```

---

Retrieve a product by its id

```
static getProductById(id: u32):Product{}
```

---

---


> ### Cart Product Class

Cart product class used for defining product and its amount in the cart

```
public product: Product;
public amount: i64;
public id: u32;
```


---

---


> ### Cart Class

Cart class defines a cart created by user and holds the content in the blockchain.

```
public id: u32;
public name: string;
public userId: u32;
public cartProducts: CartProduct[];
```

---

Add a product to the cart by given amount

```
static addProductToCart(userId:u32, cartId:u32, productId:u32, amount: i64):Cart{}
```

---

Remove a product from the cart

```
static removeProductFromCart(userId:u32, cartId:u32, productId:u32):string{}
```

---

Retrieve all the carts for the user

```
static getCarts(userId: u32):Cart[]{}
```

---

Get the total price of products in the cart.
> [ONLY USED IN METHOD! NOT A SMART CONTRACT]

```
static getCartTotalPrice(cartId: u32):u128{}
```

---

Buy the products in the cart, and transfer the money from user.

```
static buyCartProducts(userId: u32, cartId: u32):string{}
```
---
