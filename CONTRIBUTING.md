# Contributing

Every contribution is appreciated and welcome. If you're planning to add a new section or page, please create an issue first.

## Setup

* Install [Node.js](https://nodejs.org/) if you have not already.
* Fork the **cncjs.org** repo at [https://github.com/cncjs/cncjs.org](https://github.com/cncjs/cncjs.org).
* `git clone <your-clone-url> && cd cncjs.org`
* `npm install`
* `npm run dev`
* Visit [http://localhost:8000](http://localhost:8000) to preview your changes before making a pull request.

## Production

After you have finished editing the document, run `npm run build` to create a production version of the site, and push your commited changes to GitHub.

## Branching Your Changes

Making a branch in your fork for your contribution is helpful in the following ways:

* It allows you to have multiple contributions in as PRs at once.
* It allows us to identify what your contribution is about from the branch name.

## Submitting Changes

Push to your fork branch and submit a pull request to the [master](https://github.com/cncjs/cncjs.org/tree/master) branch.

> See [GitHub documentation](https://help.github.com/articles/proposing-changes-to-your-work-with-pull-requests/) for more help.

## Contribution Recognition

You can choose to add your GitHub username for recognition at the top of any markdown document you edit:

**example.md**

```markdown
---
title: Some Example Page
contributors:
  - TheLarkInn
  - Sokra
  - bebraw
  - Jhnns
  - SpaceK33z
---

## Some Documentation

```

This will add your name and GitHub profile photo to the document in production. It's a great way to own the awesome work that you do and we encourage you to do this in your PRs.
