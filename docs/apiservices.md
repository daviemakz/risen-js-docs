---
id: apiservices
title: Services
sidebar_label: Services
---

## Service Definition

Defining the capabilities for service is simply defining an object with the key being the sercice operation name and the value being the function, nice and simple.

> It's worth noting that if you were going to do caching / other performance improvements this is probably where you want to do it! You could also do it on the Express side using middleware.

As Risen.JS may have to transpile this file, it has to be separated from any of your configuration files. It should have a default export of an object and you can write it with either CommonJS or ESM.

If you use ES6+ anywhere in the file (or its imports) make sure to specify a `babelConfig` in when defining the service using `defineService()` as shown [here](apiinstance.md#defineService). This depends of course on which Node.JS version is running and which features you use are supported natively.

### Example Service

This is an example of a service definition file for a service which performs arithmetic calculations by reducing an array of numbers:

```
module.exports = {
  multiplyArrayElements({ data, sendSuccess }) {
    const listOfNumbers = data.body;
    const firstNumber = listOfNumbers.shift();
    return sendSuccess({
      result: listOfNumbers.reduce(
        (total, number) => total * number,
        firstNumber
      )
    });
  },
  divideArrayElements({ data, sendSuccess }) {
    const listOfNumbers = data.body;
    const firstNumber = listOfNumbers.shift();
    return sendSuccess({
      result: listOfNumbers.reduce(
        (total, number) => total / number,
        firstNumber
      )
    });
  },
  addArrayElements({ data, sendSuccess }) {
    const listOfNumbers = data.body;
    const firstNumber = listOfNumbers.shift();
    return sendSuccess({
      result: listOfNumbers.reduce(
        (total, number) => total + number,
        firstNumber
      )
    });
  },
  subtractArrayElements({ data, sendSuccess }) {
    const listOfNumbers = data.body;
    const firstNumber = listOfNumbers.shift();
    return sendSuccess({
      result: listOfNumbers.reduce(
        (total, number) => total - number,
        firstNumber
      )
    });
  }
};
```

### Sending Commands

To send a command to one of the operations (for example `addArrayElements`) in a running service instance your [command object](apidatastructure.md#command-object) would look like this:

```
{
  body: [1,2,3,4,5,6],
  functionName: 'addArrayElements'
  destination: 'numbersService'
}
```

You would then pass this as the parameter for one of the methods described in the [Global Methods](apiglobalmethods.md) section.
