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
echo "Registering new user"
echo ---------------------------------------------------------
echo

$near call $CONTRACT registerUser '{"name":"Recep Çiftçi", "email":"dev.selectra@gmail.com", "password": "neardevselectra", "isAdmin": true}' --account_id $CONTRACT