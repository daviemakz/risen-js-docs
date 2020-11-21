---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
---

Start building scalable high-performance microservice architectures today! Below is instruction on how to install the library.

## Installation

To install please follow the below instructions using your preferred package manager:

### NPM

```sh
npm install risen-js --save
```

### Yarn

```sh
yarn add risen-js
```

To see a working example of Risen.JS please visit the [tutorial](settingup.md) section.

## Troubleshooting installation

If you have trouble installing `risen-js`, you may not have installed `node-gyp` which is required for this framework. Please follow this checklist:

1. Make sure you're using Node.JS v10.20.1 or later

2. Make sure you have [`node-gyp`](https://github.com/nodejs/node-gyp#installation) globally installed, including all of [its dependencies](https://github.com/nodejs/node-gyp#on-unix). On Windows you may need to [configure some things manually](https://github.com/nodejs/node-gyp#on-windows).

3. If you're using Windows, follow these steps. Do them **in this order**, and **don't skip steps**.

    1. Install the **latest** of node 10 or node 12.
    2. Start an Admin PowerShell: Right-click the start icon, then pick `Windows PowerShell (Admin)`
    3. Install *both* vs2015 and vs2017 libraries. Each line will take ~5-10 minutes.
       ```sh
       npm install --global --production --vs2015 --add-python-to-path windows-build-tools
       npm install --global --production --add-python-to-path windows-build-tools node-gyp
       ```
    4. In your project, make sure you're not fighting with old build configurations. Delete **both**
       * your `%USERPROFILE%/.node-gyp` and
       * your project's `node_modules` directories.
    5. Set up `%USERPROFILE%/.npmrc` correctly:
       ```sh
       msvs_version=2015
       python=python2.7
       ```
       (where `%USERPROFILE%` is your home directory).
    6. Run `yarn install` or `npm install`

If none of these solved your problem, try browsing [previous issues](https://github.com/daviemakz/risen-js/issues?q=is%3Aissue) or open a [new issue](https://github.com/daviemakz/risen-js/issues/new).
