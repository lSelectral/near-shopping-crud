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
echo "Login with user credentials"
echo ---------------------------------------------------------
echo

$near call $CONTRACT loginUser '{"email":"dev.selectra@gmail.com", "password": "neardevselectra"}' --account_id $CONTRACT
