---
id: apidatastructure
title: Data Structure
sidebar_label: Data Structure
---

## Data Messaging Structure

Below is a description of how commands are sent in Risen.JS. All commands and responses have the same shape to ensure communication is uniform and consistent. This applies to:

- HTTP route handlers
- Service operations
- Serice core operations
- Serice core custom operations
- Risen.JS instance (both `server` / `client` mode)

### Command Object

This is the object you would pass into the [request](apiglobalmethods.md#request) and [requestChain](apiglobalmethods.md#requestchain) described in [Global Methods](apiglobalmethods.md).

#### template

```json
{
  destination: void 0,
  functionName: "",
  body: {}
}
```

#### example

```json
{
  destination: "instanceService",
  functionName: "respond"
  body: null,
}
```

#### description

- `destination [string]` - The name of the service you want to target. If the destination cannot be found service core will return an error.
- `functionName [string]` - The operation which will receive the command body as defined in the [service definition](terminology.md#service-definition) containing operations for the service.
- `body [any]` - Any data you want to send to a service instance.

> The `body` here must be serializable. If you are sending binary data you should encode it using base64 or equivalent.

### Response Object

These are the response you would receive as a callback or a resolved promise value in the [request](apiglobalmethods.md#request) and [requestChain](apiglobalmethods.md#requestchain) described in [Global Methods](apiglobalmethods.md).

#### example

```json
{
  status: true,
  transport: {
    code: 2000,
    message: "Transport completed successfully",
    responseSource: {
      name: "devService",
      pid: 93381,
      port: 1024,
      instanceId: "fba01dad-dc20-4d62-a5e0-4b61704de0cb"
    }
  },
  command: { code: 200, message: "Command completed successfully" },
  response: 100,
  error: null
}
```

#### description

- `status [boolean]` - Whether the response was successful or not.
- `transport [object]` - Contains metadata on the transport of the command.
- `command [object]` - Contains metadata on the execution of the command
- `response [any]` - This will be set if the response was successful.
- `error [any]` - This will be set if the response was failed.

##### response

When you use the [sendSuccess](apiglobalmethods.md#sendsuccess) method like so:

```jsx
sendSuccess({
  result: 50
});
```

The result will be set to the response property.

##### error

When you use the [sendError](apiglobalmethods.md#senderror) method like so:

```jsx
sendError({
  result: 50
});
```

The result will be set to the error property.
