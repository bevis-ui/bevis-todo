#!/bin/sh

REPO_URL=`git config --get remote.origin.url`

if [ ! -d static ]; then
    mkdir static
    cd static
    if git branch -a | grep gh-pages; then
        git clone -b gh-pages "$REPO_URL" .
    else
        git init
        git remote add origin "$REPO_URL"
        git checkout -b gh-pages
        touch README.md
        git add -A
        git commit -m "init"
        git push origin gh-pages:gh-pages
    fi
    cd ../
fi

YENV=production node_modules/.bin/enb make
rm -Rf static/*
mkdir -p static/build
#cp -R build/*.min.* static/build
#cp CNAME static
#node lib/build-static.js

cd static
git pull origin gh-pages
git add -A .
git commit -m "update"
git push origin gh-pages:gh-pages
