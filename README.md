# NEAR SHOPPING WEB3 API

The purpose of this project is, providing an decentralized Web3 api interface for online shopping. App runs fully on the Near blockchain with smart contracts. 
Users can create account, from that account can login/logout. Can create different carts for specific purpose like, **breakfast**, **dinner**, **technology** etc. Users can add specific product to this carts and manage their shopping experience seaminglessly.

>Near Specs 

- All data store in the  Near Blockchain persistent storage. (Models are marked as @nearBindgen for serialization)
- All scripts run as smart contract.
- Assert statements protect the contracts from invalid inputs.
- Only admin privileged users, can **create/update/delete** product

> This project is the derivative work of my previous project [Teleperformance Shopping App](https://github.com/lSelectral/Teleperformance_Shopping_App) which is made by ASP.NET Web API, EF Core, MSSQL, React and Redux. I recreated the most of the API in the blockchain.

## How to Run

1. [Clone the repo](https://github.com/lSelectral/near-shopping-crud.git)
2. Open the `bash` terminal in the project main directory.
3. Run `yarn` or `npm install` for installing required node modules from `package.json`
4. Run `yarn build:release`
5. For deploying the contract, run `production-deploy.sh` script, which located in the **`./scripts/production-deploy.sh`**.
6. After step 5, command line will show the how to export **CONTRACT** environment variable for different OS.
7. If all above steps completed, you can run scripts from `./scripts/product`,  `./scripts/user` and  `./scripts/cart`.

## Projcet File/Folder Breakdown

> scripts

Contains the scripts for running the contracts from **Near CLI**

> src/singleton/assembly/index.ts

Contains the smart contract implemantation of the models

> src/singleton/assembly/model.ts

Contains the serializable models and their methods for **CRUD** operations

## Scripts Breakdown

### Product Scripts

> **show-products.sh**

Display all products
> **get-product-by-id.sh**

Retrieve the product by its id
> **create-product.sh**

Create a new product and store it, in the persistent storage.
> **update-product.sh**

Update the values of previously created product
> **delete-product.sh**

Delete an existing product by its id

### User Scripts

> **create-cart-for-user.sh**

Create a cart for the user

> **delete-user.sh**

Delete the user from storage

> **get-users.sh**

Display all the users
> **login-user.sh**

Login with user credentials and change login statu to **true**.
> **logout-user.sh**

Logout and change login statu to **false**
> **register-user.sh**

Register and create new user in the persistent storage
### Cart Scripts

> **add-product-to-cart.sh**

Add a product to the user cart
> **buy-cart-products.sh**

Buy all the products from user list. Retrieve total amount
> **get-carts.sh**

Display all the carts from all users
> **remove-product-from-cart.sh**

Remove a product from cart.