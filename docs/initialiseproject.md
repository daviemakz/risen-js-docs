---
id: initialiseproject
title: Initialise the Project
sidebar_label: Initialise Project
---

Now, let's initialize a new NPM package to keep everything in one place. If you had installed Risen.JS globally we could have skipped this section and gone straight to creating the files.

## Create Project Folder

Create a new folder and cd into the said folder:

```
cd ~
mkdir prime-react-app
cd prime-react-app
```

## Initialise Repository

Initialize the directory as an NPM package. This will allow us to install NPM modules:

```
npm init -y
```

## Install Dependencies

Install node dependencies (fixing the react version in case of future changes):

```
yarn add @babel/register body-parser @babel/core@^7.0.0-0 @babel/preset-react @babel/preset-env react-dom@17.0.1 react@17.0.1 prop-types@15.7.2 compression@1.7.4 body-parser@1.19.0 antd@4.8.2 risen-js@latest
```
