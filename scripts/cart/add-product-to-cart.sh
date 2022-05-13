#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Checking environment variable $CONTRACT"
echo ---------------------------------------------------------
echo
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"
echo
echo ---------------------------------------------------------
echo "Adding product to the cart with static parameters"
echo ---------------------------------------------------------
echo

$near call $CONTRACT addProductToCart '{"userId": 4282263961, "cartId": 4089149924, "productId": 538052379, "amount": "100"}' --account_id $CONTRACT