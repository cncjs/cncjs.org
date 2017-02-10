#!/usr/bin/env bash

if [ "$TRAVIS" = "true" ]; then
    git config --global user.email "cncjs@cncjs.org"
    git config --global user.name "cncjs"
    ./node_modules/.bin/gh-pages \
        --silent \
        --repo https://$GITHUB_TOKEN@github.com/cncjs/cncjs.org.git \
        --dist public
else
    ./node_modules/.bin/gh-pages --dist public
fi
