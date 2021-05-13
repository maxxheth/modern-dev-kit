#!/bin/bash

./assets.sh

npm i

composer install

if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

./make-pot.sh --theme-name="$THEME_NAME" --plugin-name="$PLUGIN_NAME"

cd languages

rm -f theme.pot plugin.pot