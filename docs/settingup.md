---
id: settingup
title: Setting Up
sidebar_label: Setting Up
---

## Goal

We are going to create a simple HTTP-based microservice framework that will use Node.JS & React.JS server-side rendering to calculate all the prime numbers up to a certain number, defined within a query string, and return a server-side rendered [React.JS](https://reactjs.org) page back to your browser.

The reason we are combining both **frontend** and **backend** elements in this example is to show the power and versatility of this framework.

We will also distribute the workload across **multiple instances** of the same service we will use to do the calculation with very little configuration.

The example will be based on Linux however you can do the same thing with macOS & Windows. We will skip going through each line of JavaScript code as this example assumes basic knowledge of JavaScript.

This tutorial is geared at first-time users who want detailed instructions on how to go from zero to a Risen.JS deployable framework. There are guides available in this documentation which will go into detail on each aspect of Risen.JS. Let's start!

**Tutorial Time:** ~15-20 mins

### Demo

A completed version of this tutorial is available to download by clicking on this [link](https://github.com/daviemakz/risen-js/tree/master/demo). We highly recommend you go through this tutorial to get a better feel of this framework.

## Install Node.JS

Node.JS is an environment that can run JavaScript code outside of a web browser and is used to write and run server-side JavaScript apps. Node.JS installation includes `npm`, the package manager that allows you to install NPM modules from your terminal.

1. Open Terminal on a Mac, Linux, or Unix system. Open Git Bash on a Windows system.
1. If you have `brew` on your OS, run the following command to install Node.

```sh
brew install node
```

Alternatively, you can download an installer from the [Node.JS homepage](https://nodejs.org/en/).

## Check Node.JS Installation

Check that you have the minimum required version installed by running the following command:

```sh
node -v
```

You should see a version larger than Node 10.

```sh
node -v
v10.x + (the version you see should be the latest LTS version)
```

> Risen.JS minimum supported Node.JS version is Node 10, but more recent versions will work as well.

## Install Yarn (Optional)

We highly recommend that you install Yarn, an alternative package manager that has superb performance for managing your NPM dependencies. Check it out [here](https://yarnpkg.com/en/docs/install).

> You can still proceed with the tutorial without Yarn, you just have to use NPM instead.

Go to the next section to get started.
