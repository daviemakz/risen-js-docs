---
id: apirisen
title: Constructor
sidebar_label: Constructor
---

## The `Risen` class

```
 new Risen(options);
```

The `options` arguments represent all the settings that are passed to the constructor `Risen`. This is used to create and return an instance of Risen.JS which you can then use to build your framework.

Returns: `RisenInstance`

### constructor

#### Parameters

#### options

##### default

```
{
  address: 'localhost:8080',
  mode: 'server',
  http: false,
  databaseNames: ['_defaultTable'],
  verbose: true,
  maxBuffer: 50, // in megabytes
  logPath: void 0,
  restartTimeout: 50,
  connectionTimeout: 1000,
  msConnectionTimeout: 10000,
  msConnectionRetryLimit: 1000,
  address: 'localhost:8080',
  portRangeStart: 1024,
  portRangeFinish: 65535,
  coreOperations: {},
  runOnStart: []
}
```

##### description

- `address [string|number]` - This is the address of the service core where it will listen for new connections. We recommend always including a host otherwise if you specify just a port the service core will bind to `0.0.0.0`.
- `mode [string]` - This tells which mode the particular Risen.JS instance will operate under. "server" will have the instance run like a server. "client" mode will not start the Risen.JS instance. Both modes give you access to [Global Methods](apiglobalmethods.md).
- `http [bool]` - Please see [HTTP Configuration](#http-configuration) section.  
  `databaseNames [array]` - The number of databases you want in the Risen.JS instance. Once declared you can use the method defined in this section to create/modify/delete data. Please see the [storage](#storage) section for more details.
- `verbose [bool]` - Whether to print more verbose logs of what the instance is doing. Note this does not affect what the client will see for security reasons.
- `maxBuffer [number]` - This option specifies the largest number of bytes allowed on stdout or stderr combined. If this value is exceeded, then the service instance is restarted.
- `logPath [string]` - If you want to log to a file what you would see in the console. If you want more information set `{ verbose: true }`.
- `restartTimeout [number]` - How long to wait before restarting a service instance (in ms).
- `connectionTimeout [number]` - How long to wait while attempting to acquire a connection to the service core before trying again (in ms).
- `msConnectionTimeout [number]` - How the service core should wait while it attempting to connect to a service instance before timing out and returning an error to the source.
- `msConnectionRetryLimit [number]` - How many times the service core should try to acquire a connection to a service instance if the connection is rejected before returning an error to the source.
- `address [number|string]` - The main address where the service core listens to new connections.
- `portRangeStart [number]` - What port the service core should begin while trying to find a free port for a service instance.
- `portRangeFinish [number]` - What port the service core should end its search if it cannot find a free port. At this point, the service core will throw an error.
- `coreOperations [object]` - This follows the same structure as defining operations for services. You can add new functions here which will be available for any instance (including the service core) to use. Please see the [Service Core Operations](#service-core-operations) section for the default core operations.
- `runOnStart [array]` - What core operations you want to be executed on start-up to perform a function of your choice. This would be for example where you would put any polling if you were so inclined.
- `onConRequest [function]` - A function that is executed when a connection is received by the service core.
- `onConClose [function]` - A function that is executed when a connection is closed by the service core.

> To bind below ports 1024 you need to have privileged access.

### `mode`

#### server

To start the Risen.JS as a server you do:

```
{
  mode: server,
  ...
}
```

#### client

You can use the constructor above to also create a client version of Risen.JS.

This means if you have Risen.JS running elsewhere you can initialize a separate class in `client` mode and as long as the address on both instances is the same you can send requests to it.

So assuming you have a Risen.JS server running elsewhere on the address `localhost:8081` you can:

```
const risenClient = new Risen({
  address: 'localhost:8081',
  mode: 'client',
  verbose: false
})

risenClient.request(
  {
    body: null,
    destination: 'exampleService',
    functionName: 'echoData'
  },
  (data) => {
    // You would get your data here
    console.log(data);
  }
)
```

Please go to the [Global Methods](apiglobalmethods.md) section to see what other methods will be available to you.

### `coreOperations`

Please see the [Service Core Operations](#service-core-operations) section for more details on the default service core operations. This object takes the same form as a service definition. It's a collection of functions within an object.

For example, if you define this in your initial configuration it will be bound to the service core the same way as the default service core operations:

```
function saveStartupTime({ request }) {
  return request({
    body: {
      method: 'set',
      table: '_appStats',  // Ensure this table is defined when you initialise your Risen.JS instance
      args: [`lastStartupTime`, Date.now()]
    },
    destination: 'serviceCore',
    functionName: 'storage'
  });
}

function getServiceData({ sendSuccess }) {
  return sendSuccess({
    result: this.serviceData
  });
}

const coreOperations = {
  saveStartupTime,
  getServiceData
};

const risenInstance =  new Risen({
  coreOperations,
  databaseNames: ['_appStats'],
  mode: 'server',
});
```

> All custom functions must be defined with the `function` keyword not the named arrow function pattern.

In this example if you want to communicate with the service core custom operation you've just defined called `getServiceData` you would do:

```
{
  destination: 'serviceCore',
  functionName: 'getServiceData',
  body: null
}
```

You would pass this [command object](apidatastructure.md#command-object) as an argument to the methods described in the [Global Methods](apiglobalmethods.md) section.

### `runOnStart`

This is a useful feature if you want a service core operation to be executed when the Risen.JS instance is started. You may want to do this too, for example, begin polling a database or perform a single initialization function.

Looking at the above [example](#coreoperations) there is a custom service core operation called `saveStartupTime()` which saves the time which the Risen.JS framework started up in persistent storage. To run this function on startup you would do:

```
const risenInstance =  new Risen({
  coreOperations,
  databaseNames: ['_appStats'],
  mode: 'server',
  runOnStart: ['saveStartupTime']
});
```

This would execute this function when the framework starts. The full parameters of this function are described in the [Global Methods](apiglobalmethods.md) section.

## HTTP Configuration

Risen.JS allows you to define multiple instances of express as well as exposing the express instance itself for deeper configuration. This must be an array of configuration containing HTTP options described below:

Below HTTP capabilities are disabled and you will need to start a separate Risen.JS instance in `client` mode & matching `address` to communicate with the framework:

```
{
  http: false
}
```

In this case, because we specified an HTTP server we can communicate to the Risen.JS application via this as well as directly with a Risen.JS instance in `client` mode:

```
{
  http: [
    {
      host: 'localhost',
      port: 8888,
      ssl: false,
      harden: true,
      beforeStart: (express) => express,
      middlewares: [],
      static: [],
      routes: []
    }
  ]
}
```

> The `beforeStart` and `middlewares` are very powerful as they allow you to have full control of the express object before it's used. `beforeStart` gives you the express instance where you can do what you want with it. The `middlewares` allow you to add middlewares to express.

### `ssl`

The framework allows starting an express server via HTTPS. The configuration would look like so in that case:

```
{
  http: [
    {
      host: 'localhost',
      port: 8888,
      ssl: {
        key: '<YOUR_PATH>/server.key',
        cert: '<YOUR_PATH>/server.crt',
        ca: '<YOUR_PATH>/server.pem'
      },
      harden: true,
      beforeStart: (express) => express,
      middlewares: [],
      static: [],
      routes: []
    }
  ]
}
```

#### options.http

##### example

```
{
  host: 'localhost',
  port: 8888,
  ssl: false,
  harden: true,
  beforeStart: (express) => express,
  middlewares: [],
  static: [],
  routes: []
}
```

##### description

- `host [string]` - The express host to bind on.
- `port [number]` - The express port to listen on.
- `host [string]` - If you want to bind to a specific address. If omitted it will bind to `0.0.0.0` (all interfaces).
- `ssl [bool|object]` - Whether HTTPS will be enabled. `false` will run the express server in HTTP and supplying an object (e.g. `{ key: '', cert: '', ca: '' }`) will switch to HTTPS. The `ca` property is optional.
- `harden [bool]` - This hardening follows the guidance from this [link](https://expressjs.com/en/advanced/best-practice-security.html).
- `beforeStart [function]` - Allows you access to the express instance before initialization.
- `middlewares [array]` - If you want to apply middleware to your express instance before initialization.
- `static [array]` - Allows you to serve [static](https://expressjs.com/en/starter/static-files.html) content, relative to the folder where Risen.JS is executed.
- `routes [array]` - Please see [Route Alias Configuration](#routes) on how you map incoming requests to services.

### `routes`

Routes are defined as a collection of objects within an array. Below are the options for each route. You will need to do this for each `URI/method` combination.

#### options.http.routes[...]

##### example

A typical route object may look like this:

```
{
  method: 'GET',
  uri: '/',
  preMiddleware: [],
  postMiddleware: [],
  handler: (req, res, next, { request }) =>
    request(
      {
        body: { query: 'xyx' },
        destination: 'dbService',
        functionName: 'searchNames'
      },
      (data) => res.send(data);
    )
}
```

The `handler` (or HTTP route handler) property will receive the same parameters you would with a typical [route](https://expressjs.com/en/guide/routing.html) in the Express server.

A fourth parameter is an object which contains methods described in the [Global Methods](apiglobalmethods.md#parameter-object) section of this documentation.

> If you are going to be, for example, sending an HTTP body with your request it's advised to add a middleware to the express configuration of the server to help with this such as `body-parser`. It will make dealing with this data easier at this stage.

##### description

- `method [string]` - The method of the URI, case sensitive. Allowed values are `"get"|"delete"|"post"|"patch"|"put"`
- `URI [string]` - The URI in which this route will be mapped.
- `preMiddleware [array]` - Any middleware you want the request to pass through before running your HTTP route handler.
- `postMiddleware [array]` - Any middleware you want the request to pass through after running your HTTP route handler.
- `handler [function]` - This is where you link express with the framework. It’s here where you receive an HTTP request from a client, you then send a command to your chosen service, receive a response from the service, and send the data back to the client via `res.send()` o.e.

## Service Core Operations

Service core operations work exactly as they do in the services themselves and receive the same parameters.

The only difference is they are executed in the service core process, so if you are not careful you could block your framework if you do something CPU intensive, stopping further communication.

You can call these methods from anywhere. Below is the [command object](apidatastructure.md#command-object) you need to pass to one of the methods described in the [Global Methods](apiglobalmethods.md) section:

> To access these methods below your destination should always be set to `serviceCore`. This also applies to any service core custom operations you have defined as well when you initialized the Risen.JS instance.

### `end`

This function shuts down the Risen.JS microservice framework. The service instances are shut down first and then the service core. The [command object](apidatastructure.md#command-object) looks like this:

```
{
  destination: 'serviceCore',
  functionName: 'end',
  body: null // Nothing is required
}
```

### `storage`

This is the operation that provides access to persistent storage for a running Risen.JS instance. All storage operations only happen on the service core ensuring synchronization.

The storage is powered by [Quick-DB](https://www.npmjs.com/package/quick.db) so please have a look at available methods to use. The [command object](apidatastructure.md#command-object) looks like this:

```
{
  destination: 'serviceCore',
  functionName: 'storage',
  body: {
    method: 'set' // See a full list by visiting the above link
    table: '_defaultTable', // Make sure you have defined the "table" in the when you initialised Risen.JS or you will get an error.
    args: ['randomNumber', 1024] // Arguments will change depending on the method, these will be spread across the Quick.DB method
  }
}
```

Because you can initialize multiple tables at start-up you can separate your data as you need. The data will be stored in a `json.sqlite` file in the `__dirname` folder.

### `changeInstances`

This is one of the key core operations in Risen.JS because this service core operation allows you to **increase and decrease** the instance count of any services you have already defined during runtime.

This means it’s possible to have a service dedicated to monitoring load and increasing/decreasing the instance count of various services where necessary. How you implement this is up to you.

The command is very simple, define the name of the service you want to change the instance count, and define how many instances you want to add/remove.

#### Adding Instances

The [command object](apidatastructure.md#command-object) for adding **3** instances to a service:

```
{
  destination: 'serviceCore',
  functionName: 'changeInstances',
  body: {
    name: 'exampleService' // The name of the service
    instances: 3 // The number of instances you want to add
  }
}
```

#### Removing Instances

The [command object](apidatastructure.md#command-object) for removing **3** instances to a service:

```
{
  destination: 'serviceCore',
  functionName: 'changeInstances',
  body: {
    name: 'exampleService' // The name of the service
    instances: -3 // The number of instances you want to remove
  }
}
```

Note that if you only have **2** instances and request to remove **5** the service core will stop all remaining instances, effectively shutting down this service. You can always start them back up at any point during runtime.
