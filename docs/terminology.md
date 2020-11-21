---
id: terminology
title: Glossary
sidebar_label: Terminology
---

## Terminology

To ensure this documentation is clear as possible please familiarise yourself with some of this terminology.

#### Micro service / service

This would be a service you have already defined.

#### Service instances

These are copies of a particular service, a microservice needs at-least one instance (by default) to be started.

#### Service operations

These are the functions which are defined within an object which you point to when you define your service.

#### Service definition

This is a file that holds a collection of service operations as an object with that object being the default export of that file.

#### Service core

This is the core process that manages all other services. Communication with the services from express and between microservices always passes through via the service core.

#### Service core operations

These are the functions that are included in the service core. These allow you to do things like changing the number of instances of a service or accessing global storage.

#### Service core custom operations

You can add your own service core custom operations when you initialize the framework. These will work exactly as the

#### Default service core operations

These are the service core operations which are included by default in any Risen.JS instance. Currently there are three:

- `end` - Terminates the Risen.JS process and all its services
- `storage` - Allows access to persistent framework level storage powered by [Quick-DB](https://www.npmjs.com/package/quick.db) .
- `changeInstances` - Allows you to change the number of service instances during runtime. This allows for dynamic scaling of services depending on load or other factors.

#### Command object

This is an object which allows you to communicate with different service instances, service core, and service core operations. Its described in detail in the [command object](apidatastructure.md#command-object) section.

#### Response object

This is the shape of the response you will recieve after sending a command and will always be the same. Its described in detail in the [response object](apidatastructure.md#response-object) section.

#### Risen instances

These are distinct instances of the Risen.JS framework. You may have an instance running in `server` or `client` mode.

#### HTTP route handlers

These functions are applied to express routes and connect express with the framework.

#### Risen.JS Framework / framework

Refers to the combination of the `service core` and `microservices` working under the framework.
