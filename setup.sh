#!/bin/bash
# Author: Eliott BARKER
# Purpose: Set the environnement

echo "Entrer l'authentifier de l'API (AUTH_PASS):"
read AUTH_PASS

echo "Entrer le token de chiffrement des JWT de l'API (TOKEN_SECRET):"
read TOKEN_SECRET

echo "Entrer le nom de la base de données (MYSQL_DATABASE):"
read MYSQL_DATABASE

echo "Entrer le nom d'utilisateur de la base de données (MYSQL_USER):"
read MYSQL_USER

echo "Entrer le mot de passe de la base de données (MYSQL_PASSWORD):"
read MYSQL_PASSWORD

echo AUTH_PASS=$AUTH_PASS > .env
echo TOKEN_SECRET=$TOKEN_SECRET >> .env
echo MYSQL_DATABASE=$MYSQL_DATABASE >> .env
echo MYSQL_USER=$MYSQL_USER >> .env
echo MYSQL_PASSWORD=$MYSQL_PASSWORD >> .env

echo "Environnement configuré"

exit 0
