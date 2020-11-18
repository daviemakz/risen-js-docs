---
id: overview
title: Overview
sidebar_label: Overview
---

## Introduction

Risen.JS is a framework for building event-driven, efficient, and scalable non-blocking Node.JS server-side applications. It uses ES6+ JavaScript and combines elements of OOP (Object Oriented Programming) and FP (Functional Programming).

## Internal Architecture

At its core, this library adopts a message-based architecture that allows the decoupling of producers and consumers of messages, both in time and space. This has a lot of benefits:

- producers and consumers can run on different machines
- producers and consumers can run at different times
- producers and consumers can run on different hardware/software platforms (they only need to understand the same message protocol)
- it's easy to coordinate multiple producers/consumers (e.g. for compute-intensive jobs that need multiple machines)
- higher stability when services are temporarily unavailable (e.g. when doing order processing, using a messaging system can help avoid "dropping" orders)

## Additional Libraries

Under the hood, Risen.JS makes use of the well-known and robust [Express](http://expressjs.com) HTTP(s) package, [Quick-DB](https://www.npmjs.com/package/quick.db) for long term persistent storage, and the native [child process](https://nodejs.org/api/child_process.html) feature in Node.JS. The library also uses [Babel](https://babeljs.io/) to support runtime transpilation of ES6+ code.

Risen.JS provides a level of abstraction above these frameworks but also exposes their APIs directly to the developer. This allows for easy use of the myriad third-party modules, packages, and middleware’s which are available for each platform.

Because the "services" you will create run as independent Node.JS processes, this means you can build microservices utilizing the tens of thousands of NPM packages that currently exist and are added every day. Simply put anything you can do in Node.JS, you can build a microservice to do for you.

## Use Cases

From inserting and retrieving data from a separate external database (e.g. Redis) to a service that converts images. It’s even possible to use this framework alongside [server-side rendering](https://reactjs.org/docs/react-dom-server.html), the possibilities are endless!
