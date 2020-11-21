---
id: apicodes
title: Codes
sidebar_label: Codes
---

## Summary

Risen.JS status codes indicate whether a specific request has been completed or has not.

## Categories

Transport state refers to getting the command to its destination. Command state refers to what happens when it is executed on the service instance or service core.

Since there are two parts to this, the transport level and the command level they have been split into these categories:

- Successful transport responses (2000–2999)
- Successful command responses (200–299)
- Transport errors (5000–5999)
- Command errors (400–599)

You can set your codes using the [sendSuccess](apiglobalmethods.md#sendsuccess) and [sendError](apiglobalmethods.md#senderror) methods as long as you stay within these numerical ranges.

This is to allow you to set different status codes as this can be important when building a server-side application and want to differentiate different types of success or failure responses.

> If using the above methods you set an otherwise successful command to `sendSuccess({result: true, code: 300})`, Risen.JS will interpret this as a failure.

### Success Codes

#### Transport

- 2000 - Transport completed successfully.

#### Command

- 200 - Command completed successfully.

### Error Codes

#### Transport

- 5001 - No data received.
- 5002 - Service connection initiation attempts, maximum reached.
- 5003 - Unable to connect to the service core.
- 5004 - Unable to connect to a specific service.
- 5005 - Request received but destination unknown.
- 5006 - Micro service process exited unexpectedly.
- 5007 - Request received & destination verified but function unknown.

#### Command

- 400 - Command executed but an error occurred while processing the request.
- 401 - Command executed but an error occurred while attempting storage operation.
- 402 - Command executed but an error occurred while attempting to change instances.
- 500 - Command not executed, transport failure, or no data received.
- 501 - Command not executed, internal redirection failure.
- 502 - Command not executed, no data received by service.
- 503 - Command not executed, function unknown.
