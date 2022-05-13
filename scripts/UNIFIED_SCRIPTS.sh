# Bash doesn't recognize near globally in windows
export near="C:\Users\Administrator\AppData\Roaming\npm\near.cmd" 

# Deploy contract from debug
$near dev-deploy build/debug/singleton.wasm 
# Deploy contract from release
$near dev-deploy build/release/singleton.wasm 

# -------------------- PRODUCTS ----------------------------
$near call $CONTRACT createProduct '{"userId": 4282263961, "name": "Pasta", "price": 36}' --account_id $CONTRACT

$near call $CONTRACT updateProduct '{"userId": 4282263961, "productId": 538052379, "name": "CAKE", "price": 9}' --account_id $CONTRACT

$near call $CONTRACT deleteProduct '{"userId": 4282263961, "productId": 538052379}' --account_id $CONTRACT

$near view $CONTRACT showProducts

$near view $CONTRACT getProductByID '{"id": 538052379}'

# -------------------- PRODUCTS ----------------------------


# -------------------- USER ----------------------------

$near call $CONTRACT registerUser '{"name":"Recep Çiftçi", "email":"dev.selectra@gmail.com", "password": "neardevselectra", "isAdmin": true}' --account_id $CONTRACT

$near call $CONTRACT loginUser '{"email":"dev.selectra@gmail.com", "password": "neardevselectra"}' --account_id $CONTRACT

$near call $CONTRACT logoutUser '{"userId": 4282263961}' --account_id $CONTRACT

$near call $CONTRACT deleteUser '{"userId": 4282263961}' --account_id $CONTRACT

$near view $CONTRACT getUsers

$near call $CONTRACT createCartForUser '{"userId": 4282263961, "cartName": "lunch"}' --account_id $CONTRACT

# -------------------- USER ----------------------------


# -------------------- CART ----------------------------

$near call $CONTRACT addProductToCart '{"userId": 4282263961, "cartId": 4089149924, "productId": 538052379, "amount": "100"}' --account_id $CONTRACT

$near call $CONTRACT removeProductFromCart '{"userId": 4282263961, "cartId": 4089149924, "productId": 538052379}' --account_id $CONTRACT 

$near view $CONTRACT getCarts

$near call $CONTRACT buyCartProducts '{"userId": 4282263961, "cartId": 4089149924}' --account_id $CONTRACT

# -------------------- CART ----------------------------