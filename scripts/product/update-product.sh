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
echo "Updating product with static parameters"
echo ---------------------------------------------------------
echo

$near call $CONTRACT updateProduct '{"userId": 4282263961, "productId": 538052379, "name": "CAKE", "price": 9}' --account_id $CONTRACT