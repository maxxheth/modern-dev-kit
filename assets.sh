#!/bin/bash

mkdir assets

cd assets

mkdir js scss

cd js;

mkdir src dist

cd src

echo "console.log('Hello world!')" > main.js

cd ../../scss

mkdir src dist

cd src

echo "h1 { color: red; }" > style.scss