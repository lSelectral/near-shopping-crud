# NEAR SHOPPING WEB3 API

The purpose of this project is, providing an decentralized Web3 api interface for online shopping. App runs fully on the Near blockchain with smart contracts. 
Users can create account, from that account can login/logout. Can create different carts for specific purpose like, **breakfast**, **dinner**, **technology** etc. Users can add specific product to this carts and manage their shopping experience seaminglessly.

> Features

- Product --> view
- Product --> create/update/delete (ADMIN ONLY)
- User -----> account register/login/logout/view/delete
- Cart -----> create/update/delete/view
- Buy ------> products in the cart

---

>Near Specs 

- All data store in the  Near Blockchain persistent storage. (Models are marked as `@nearBindgen` for serialization)
- All scripts run as smart contract.
- Assert statements protect the contracts from invalid inputs.
- Only admin privileged users, can **create/update/delete** product

---

> This project is the derivative work of my previous project [Teleperformance Shopping App](https://github.com/lSelectral/Teleperformance_Shopping_App) which is made by ASP.NET Web API, EF Core, MSSQL, React and Redux. I recreated the most of the API in the blockchain.

---

## How to Run

1. [Clone the repo](https://github.com/lSelectral/near-shopping-crud.git)
2. Open the `bash` terminal in the project main directory.
3. Run `yarn` or `npm install` for installing required node modules from `package.json`
4. Run `yarn build:release` or `npm run build:release`
5. For deploying the contract, run `production-deploy.sh` script, which located in the **`./scripts/production-deploy.sh`**.
6. After step 5, command line will show the how to export **CONTRACT** environment variable for different OS.
7. If all above steps completed, you can run scripts from `./scripts/product`,  `./scripts/user` and  `./scripts/cart`.

---

## Projcet File/Folder Breakdown

> scripts

- Contains the scripts for running the contracts from **Near CLI**

> src/singleton/assembly/index.ts

- Contains the smart contract implemantation of the models

> src/singleton/assembly/model.ts

- Contains the serializable models and their methods for **CRUD** operations

```txt
src
├── lottery                       <-- Lottery contract
│   ├── README.md
│   ├── __tests__
│   │   ├── README.md
│   │   ├── fee-strategies.unit.spec.ts
│   │   ├── index.unit.spec.ts
│   │   └── lottery.unit.spec.ts
│   └── assembly
│       ├── fee-strategies.ts
│       ├── index.ts
│       └── lottery.ts
└── utils.ts                      <-- shared contract code
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

- Ex: `$near view $CONTRACT getProductByID '{"id": 538052379}'`

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

- Create a new product and store it, in the persistent storage.

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
- Args: `{}`

- Ex: `$near view $CONTRACT getCarts`

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
