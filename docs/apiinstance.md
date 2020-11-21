---
id: apiinstance
title: Instance
sidebar_label: Instance
---

## The `RisenInstance` class

```jsx
const risenInstance = new Risen(...);
```

Once you have initialized your `Risen` class the result is a `RisenInstance`, which is an instance of the `Risen` class.

### `defineService`

This method allows you to define a service that will can then be started by Risen.JS.

```jsx
risenInstance.defineService(serviceName, serviceDefinitionPath, options);
```

#### example

```jsx
risenInstance.defineService("render", "./services/render.js", {
  babelConfig: {},
  instances: 1,
  loadBalancing: "roundRobin",
  runOnStart: []
});
```

#### parameters

- `serviceName [string]` - This is the name of your service. It's what you will use to send data to instances of this service.
- `serviceDefinitionPath [string]` - This can be a relative path or an absolute path of your [service definition](terminology.md#service-definition) file.
- `options [object]` - The options of the service.

##### serviceName

This must be a string and unique to all other services otherwise you will get an error.

##### serviceDefinitionPath

This can be a relative path or an absolute path. This file should contain a [service definition](terminology.md#service-definition) containing a default export of an object with a collection of functions. Please visit the [Services](apiservices.md#example-service) section to get details on what this file should contain.

##### options

The file which configures your service.

###### default

```json
{
  babelConfig: {},
  loadBalancing: "roundRobin",
  runOnStart: [],
  instances: 1
}
```

> Instance count can be changed after runtime via the service core operation `changeInstances`.

###### description

- `babelConfig [object]` - If defined this should be a babel [configuration](https://babeljs.io/docs/en/configuration) and Risen.JS will transpile the [service definition](terminology.md#service-definition) before starting the service.
- `loadBalancing [string]` - What is the load balancing strategy for this service. See the [section](#loadbalancing) for more information.
- `runOnStart [array]` An array containing the names of functions you want to execute when the service instance starts. These should be in your [service definition](terminology.md#service-definition) file.
- `instances [number]` - This defines how many instances of the service should the service core start.

> If you include `babelConfig` ensure you have installed your presets and plugins relative to the Risen.JS configuration file. If not you will get an error on startup.

##### loadBalancing

This setting can be set to:

- random
- roundRobin
- a custom function

###### _random_

This randomly assigns requests to service instances.

###### _roundRobin_

Round-robin is one of the algorithms employed by process and network schedulers in computing.

In our context it means requests are sent to each service instance in equal portions and circular order, handling all processes without priority (also known as cyclic executive).

###### _custom function_

Here you can completely control how requests are sent to your service instances. For this you need to pass a function with the signature:

```json
{
  loadBalancing: (socketList, command) => {
     return socketList[0]
  }
}
```

Notice you receive the [command object](apidatastructure.md#command-object) which is what will be sent to the service instance. You can use this to route requests to different service instances depending on this if you like.

You then have to return one of the elements in the array, each one representing a service instance.

> If you set this to a custom function you will receive a list of sockets. You must return one of those sockets synchronously.

##### runOnStart

If you wanted a persistent action to execute on an instance of a service, like polling for example, you would likely use `runOnStart` and set up some kind of recursive polling.

### `startServer`

After you have configured your server you use this method to start the server. This method does nothing if you are in the `client` mode.

Ensure you have finished the configuration before starting the Risen.JS framework.

#### example

```jsx
risenInstance.startServer();
```

#### parameters

_n/a_

### `log`

This method allows you to log anything to the log file (if it's defined) and the `stdout`.

#### example

```jsx
risenInstance.log(message, level, override);
```

#### parameters

- `message [string]` - This is the content you want to log.
- `level [string]` - This refers to the type of the log.
- `override [boolean]` - Whether to ignore the `verbose:false` option if its been set.

##### message

This must be a format compatible with the `console` object.

##### level

This is the level of the log and valid string options are:

- log
- warn
- error

##### override

If you have `verbose: false` set in the framework options you need to set this to true otherwise your log will be ignored

### `request`

For information on the arguments on this method please visit the [request](apiglobalmethods.md#request) section.

### `requestChain`

For information on the arguments on this method please visit the [requestChain](apiglobalmethods.md#requestchain) section.
