---
id: philosophy
title: Philosophy
sidebar_label: Philosophy
---

## Why Risen.JS?

There is a lot of Node.JS-based microservice frameworks out there and some of them are very powerful, however generally speaking they are quite complicated and require a significant amount of knowledge outside of JavaScript to utilize effectively or securely (especially in a production environment).

## Guiding Principles

This package was created to handle a lot of the complexity involved in deploying robust and dependable microservices.

Its also designed to use the latest ECMA code

These are the key principles which led to the design of this package:

- The framework should allow the latest JavaScript features to be used with built-in transpiler support via [Babel](https://babeljs.io/)
- The framework should not require extensive knowledge outside of JavaScript
- The framework should allow you to define multiple "services" designed to handle multiple workloads
- The framework should allow RESTful API communication to multiple HTTP and HTTP(s) [Express](http://expressjs.com) instances concurrently
- The framework should allow Node.JS based communication between instances of Risen.JS concurrently
- The framework should allow the number of discrete "services" to be scaled depending on load & support multiple load balance strategies
- The framework should allow the instancing of "services" for better load balancing and higher throughput
- The framework should allow microservices to communicate with any other service and share data
- The framework should have built-in persistent storage which can be utilized by any of the "services"
- The framework should be OS agnostic and run on all well-known platforms
- The framework should be fast, secure, scalable, and efficient
- The framework should handle errors seamlessly and not crash due to an error in a "service"
- The framework should restart failed services automatically and allow changing of the number of instances during runtime
- The framework should handle all communication, ports, and routing and allow extensive hardening and configuration

From these broad set of principles, Risen.JS was created as a result.
