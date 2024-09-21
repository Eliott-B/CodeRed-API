#!/bin/bash
# Author: Eliott BARKER
# Purpose: Run the API server
# Options: -s, --setenv: Set the environnement
#          -h: Display the help

if [ $# -gt 0 ]; then
    for arg in "$@"; do
        if [[ $arg = "-s" || $arg = "--setenv" ]]; then
            ./setenv.sh
        elif [[ $arg = "-h" ]]; then
            echo "Script pour lancer l'API de CodeRed"
            echo "Usage: ./run.sh [-s --setenv]"
            echo "-s, --setenv: Configure l'environnement"
            exit 0
        else
            echo "Usage: ./run.sh [-h]"
            exit 1
        fi
    done
fi


export $(cat .env | xargs) rails 

if [ $? -ne 0 ]; then
    echo "Erreur pendant le chargement de l'environnement"
    exit $?
fi

npm i

if [ $? -ne 0 ]; then
    echo "Erreur pendant l'installation de l'API"
    exit $?
fi

npm run start

if [ $? -ne 0 ]; then
    echo "Erreur pendant l'exécutable de l'API"
    exit $?
fi

exit 0
