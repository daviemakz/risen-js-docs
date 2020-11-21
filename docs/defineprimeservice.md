---
id: defineprimeservice
title: Define the "prime" service
sidebar_label: Prime Service
---

Now at this stage, we are going to define our first service. This service will have one service operation called `getPrimeListFromRange` which will calculate all the prime numbers in a given number range.

We want to do this because we want to share the workload across multiple identical services of `prime` and then combine the result later.

The `prime` service will receive these commands from the `render` service, calculate all the prime numbers up to that number, and send the result back to its `render` service.

## Create Folder

Create a new folder called `services/prime` and cd into that folder:

```sh
mkdir -p services/prime && cd services/prime
```

## Create File

Create the file which will contain the service you are going to initialize in the framework later. Each service definition is a collection of functions in an object:

```sh
touch index.js
```

## Add Service Definitions

Paste the following code into the file you've just created. This is an example of a service definition. All services require a single service definition file containing an **object** which is the default export of that file.

That object simply needs to contain a list of named functions. Each one of these functions will receive the same parameters.

```jsx
function getPrimeList(min, max) {
  const sieve = [];
  let i;
  let j;
  const primes = [];
  for (i = 2; i <= max; ++i) {
    if (!sieve[i]) {
      // i has not been marked -- it is prime
      if (i >= min) {
        primes.push(i);
      }
      for (j = i << 1; j <= max; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}

module.exports = {
  getPrimeListFromRange: ({ sendSuccess, data }) => {
    const { start, end } = data.body;
    // Will calculate prime numbers for a given number range.
    const listOfPrimeNumbers = getPrimeList(start, end);
    // Send the result back to its source
    return sendSuccess({
      result: listOfPrimeNumbers,
    });
  },
};
```

> Don't worry too much about the arguments in the above getPrimeListFromRange() operation. You can see all the parameters in the API Reference section of this documentation.

## Back To Root

Back To Root:

```sh
cd ../..
```

## Summary

The folder structure should have so far should look like this:

```
├── package.json
├── services
│   ├── prime
│   │   └── index.js
└── yarn.lock | package.json
```

If you have the `tree` command installed in your terminal you can check this by running:

```sh
tree -I "node_modules|cache|test_*'\n
```

Great work so far, just two more steps to go and we will have a fully build Risen.JS framework! Please continue to the next section...
