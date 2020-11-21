---
id: apiglobalmethods
title: Globally accessible methods
sidebar_label: Global Methods
---

## Global Methods

A key feature for simplicity to ensure you do not need to learn what parameters will be for the various places in which handlers, functions, operations are defined. So in Risen.JS, all functions receive the same core methods which can be used in the same way. This applies to:

- HTTP route handlers
- Service operations
- Serice core operations
- Serice core custom operations
- Risen.JS instance (both server / client mode)

This means any part of Risen.JS can communicate with any other part at any time. A service core operation function (e.g. storage) can send a command to a service, the Express server can send a command to the service core, a service instance can send a message to another service instance, and so on.

### Parameter Object

All functions will receive this object as their first parameter which will contain everything you need. Here is an example of the parameter object:

```json
{
  data: {
    destination: "numbersService",
    functionName: "addArrayElements",
    body: [1, 2, 3],
    source: {
      name: "renderService",
      pid: 80165,
      address: "localhost:1031",
      instanceId: "76c5222c-be09-4721-b1be-90670155eb86"
    },
    conId: 0
  },
  sendSuccess: [Function: sendSuccess],
  sendError: [Function: sendError],
  request: [Function: bound request],
  requestChain: [Function: bound requestChain],
  operations: {
    getStandardResponse: [Function: bound getStandardResponse],
    getNumberFifty: [Function: bound getNumberFifty],
    getNumberOneHundred: [Function: bound getNumberOneHundred],
    performCalculation: [Function: bound performCalculation],
    echoData: [Function: bound echoData],
    noDataRecieved: [Function: bound noDataRecieved],
    redirectFailed: [Function: bound redirectFailed]
  },
  localStorage: {}
}
```

> This object contains more than the properties shown above, they are used by the methods documented in this section.

### `data`

This contains all the information sent when the [command object](apidatastructure.md#command-object) was dispatched.

- `destination` - The destination of the operation, and will match what service this operation is called in.
- `functionName` - The name of the operation to run on the service instance or service core.
- `body` - The body of the command, normally this is where you would receive any data required for the operation.
- `source` - This contains information on the sender of the request.
- `conId` - This is a service instance specific count and shows how many requests have been processed by said service or service core.

This is an example of a [command object](apidatastructure.md#command-object). The other two parameters, `source` and `conId` are added by the service core in the transport stage.

#### source

This data is set before the command is sent to its destination.

- `name` - The name of the service which sent the command
- `pid` - The process id of the service which sent the command
- `address` - The address to which the process is bound to. This will be `undefined` in the case of the service core.
- `instanceId` - The unique GUID identifying the service instance. This will be `null` in the case of the service core.

### `request`

This method allows you to send requests in Risen.JS. It supports both the callback and promise patterns.

A description of the [command object](apidatastructure.md#command-object) and the schema of the [response object](apidatastructure.md#response-object) is available in the [Data Structure](apidatastructure.md) section.

```jsx
request(commandObject, callback)
```

#### example

##### callback

```jsx
request(
  {
    body: null,
    destination: "exampleService",
    functionName: "echoData"
  },
  (data) => {
    // do something with the "data"
  }
);
```

##### promise

```jsx
async () => {
  const data = await request({
    body: null,
    destination: "exampleService",
    functionName: "echoData"
  });
  // do something with "data"
};
```

#### parameters

- `commandObject` - Contains the information on the request
- `callback` - Once the request has been processed this callback function is executed with the result. _This is optional._

### `requestChain`

As Risen.JS is designed to allow easy communication between multiple services you might want to send multiple requests to multiple sources. Using just the [request](#request) method you could easily end up with messy code.

It can also be the case the commands you send may vary depending on the previous responses you" ve received and you may want to create these commands based on previous responses. To solve this you have this method.

Instead of passing a [command object](apidatastructure.md#command-object) you instead pass an array of [command objects](apidatastructure.md#command-object) which are processed one at a time.

```
requestChain(commandList, callback)
```

#### example

##### callback

```jsx
requestChain(
  [
    {
      body: { userId: "B8F91C0C-E4EB-4C65-999E-11AA7FEB46DE" },
      destination: "dbService",
      functionName: "getUserAddress"
    },
    {
      body: { userId: "B8F91C0C-E4EB-4C65-999E-11AA7FEB46DE" },
      destination: "geoLocatorService",
      functionName: "getUserGeolocation"
    }
  ],
  (data) => {
    // do something with "data"
  }
);
```

##### promise

```jsx
async () => {
  const data = await requestChain([
    {
      body: { userId: "B8F91C0C-E4EB-4C65-999E-11AA7FEB46DE" },
      destination: "dbService",
      functionName: "getUserAddress"
    },
    {
      body: { userId: "B8F91C0C-E4EB-4C65-999E-11AA7FEB46DE" },
      destination: "geoLocatorService",
      functionName: "getUserGeolocation"
    }
  ]);
  // do something with "data"
};
```

#### parameters

- `commandList` - An array of command objects.
- `callback` - Once the request has been processed this callback function is executed with the result. _This is optional._

#### commandList

The schema of the [command object](apidatastructure.md#command-object) can be seen in the [Data Structure](apidatastructure.md) section. When used in this method there are two more optional properties added to the [command object](apidatastructure.md#command-object).

```json
{
  body: { userId: "B8F91C0C-E4EB-4C65-999E-11AA7FEB46DE" },
  destination: "geoLocatorService",
  functionName: "getUserGeolocation",
  generateBody: (body, results) => {},
  generateCommand: (body, results) => {},
}
```

##### generateBody

This function allows you to generate the body of that command using the results of the previous commands.

###### example

```json
{
  body: 125,
  generateBody: (body, results) => {
    const numberList = results
      .map((res) => res.response)
      .concat(body);
    return {
      numberList,
      calculationMethod: "multiplyArrayElements"
    };
  },
  destination: "devService",
  functionName: "performCalculation"
}
```

- `body` will be the same as the one in the command object.
- `results` will be the results that have been received so far in an array.

> In the above example the `body: 125` will be replaced by the return value of `generateBody()`.

###### generateCommand

This function allows you to generate a [command object](apidatastructure.md#command-object) using the results of the previous commands. It should match the command schema defined in the [Data Structure](apidatastructure.md) section.

###### example

```json
{
  generateCommand: (body, results) => {
    return {
      body: {
        numberList: results.map((res) => res.response),
        calculationMethod: "addArrayElements"
      },
      destination: "devService",
      functionName: "performCalculation"
    };
  }
}
```

- `body` will be the same as the one in the command object.
- `results` will be the results that have been received so far in an array.

Ensure the return value of `generateCommand()` matches the schema of a [command object](apidatastructure.md#command-object).

### `sendSuccess`

This is one of the methods you will use to send a successful response back to its source.

You don't have to worry about which service instance the request came from, just use this method to send a successful response if everything was successful.

#### example

```jsx
sendSuccess(options);
```

##### typical usage

```jsx
sendSuccess({ result: 50 });
```

#### parameters

##### options

This is the schema of the parameter object:

```json
{
  "result": 100,
  "code": 200,
  "message": "Command completed successfully"
}
```

- `result` - The result of your operation.
- `code` - The command code of the operation. _This is optional._
- `message` - The message you want to be received from the operation. _This is optional._

You don't normally need to set the `code` but be aware that anything which is not between `200` and `299` is considered an error. For more information on this visit [this](apicodes.md#categories) section.

> You can set the `message` to be anything you like.

### `sendError`

This is one of the methods you will use to send a failure response back to its source.

You don't have to worry about which service instance the request came from, just use this function to send a failure response if something went wrong.

#### example

```jsx
sendError(options);
```

##### typical usage

```jsx
sendError({ result: 50 });
```

#### parameters

##### options

This is the schema of the object:

```json
{
  "result": 100,
  "code": 400,
  "message": "Command executed but an error occurred while processing the request"
}
```

- `result` - The result of your operation.
- `code` - The command code of the operation. _This is optional._
- `message` - The message you want to be received from the operation. _This is optional._

### `operations`

The `operations` is an object containing all the operations defined on the service instance or service core. This means if you need to run an operation on the same server you can call that function directly without having to send the response back just for that service to send a follow-up request.

#### example

```json
{
  operations: {
    getStandardResponse: [Function: bound getStandardResponse],
    getNumberFifty: [Function: bound getNumberFifty],
    getNumberOneHundred: [Function: bound getNumberOneHundred],
    performCalculation: [Function: bound performCalculation],
    echoData: [Function: bound echoData],
    noDataRecieved: [Function: bound noDataRecieved],
    redirectFailed: [Function: bound redirectFailed]
  },
}
```

#### typical use case

The only difference here is you will need to pass in your parameters into the operations as you are calling them directly, and not from an incoming request.

So assuming your [service definition](terminology.md#service-definition) looks like this, you could:

```jsx
module.exports = {
  getYear() {
    return new Date().getFullYear();
  },
  getMonth() {
    return new Date().getMonth();
  },
  getDay() {
    return new Date().getDay();
  },
  getDateFormatted({ sendSuccess, operations }) {
    // Get the above functions
    const { getYear, getMonth, getDay } = operations;
    // Use them to generate your result
    return sendSuccess({
      result: `${getDay()}-${getMonth()}-${getYear()}`
    });
  }
};
```

### `localStorage`

This object will be available on service instances and the service core. The intended use is to allow you to do things like cache the responses you have received previously instead of performing the same computation again.

`localStorage` is not shared between service instances or the service core and there is no mechanism to ensure you don't hit a memory limit so ensure you have factored this in when you use it.

> Be aware as since this is process specific if you have multiple service instances of the same service there is a risk of the duplicated cache. If the data is small this should be okay but if not its may be better to save this data in the service core via the `storage` service core operation.

#### typical use case

Here" we are going to use this to cache the result of a calculation and return the cached result if we have seen the same arguments before. The calculation is to get the power of a number:

```jsx
module.exports = {
  getPowerOfNumber({ data, sendSuccess, localStorage }) {
    const num = data.body;
    if (Object.prototype.hasOwnProperty.call(localStorage, num)) {
      return sendSuccess({
        result: localStorage[num]
      });
    }
    // Calculate the result
    const poweredNumber = num ** 2;
    // Save in cache
    Object.assign(localStorage, { [num]: poweredNumber });
    // Send the response back like usual
    return sendSuccess({
      result: poweredNumber
    });
  }
```
