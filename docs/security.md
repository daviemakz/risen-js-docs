---
id: security
title: General Security Model
sidebar_label: Security
---

## Risen.JS Security Model

Risen.JS is intended to be used only by trusted clients inside trusted environments.

This means that usually, it is not a good idea to expose the Risen.JS service port directly to the internet or to an environment where untrusted clients can directly access the Risen.JS port or any of its services.

This is best implemented by whitelisting only the ports you want to expose externally rather than forbidding certain ports _e.g. in the case of HTTP(s) port 80 & 443._

As Risen.JS is designed for building full server-side applications Risen.JS it includes the robust [Express](http://expressjs.com) library to make building RESTFul API's which you can expose to untrusted environments. This is the only port which should be accessible outside of your trusted environment.

### Using `harden` option

We include an optional harden option for all Express servers which can be enabled by setting this to `true` when configuring your [http](apirisen.md#http-configuration) server(s).  

This is powered by [Helmet](https://github.com/helmetjs/helmet) which protects your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Default protections include:

- `csp` sets the Content-Security-Policy header to help prevent cross-site scripting attacks and other cross-site injections.
- `hidePoweredBy` removes the X-Powered-By header.
  hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the Expresss server.
- `ieNoOpen` sets X-Download-Options for IE8+.
- `noCache` sets Cache-Control and Pragma headers to disable client-side caching.
- `noSniff` sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.
- `frameguard` sets the X-Frame-Options header to provide clickjacking protection.
- `xssFilter` sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.

We highly recommend following the [best practices](https://expressjs.com/en/advanced/best-practice-security.html) for ensuring your Express server is secure.

## Network Security

Access to the Risen.JS port should be denied to everybody but trusted clients in the network, so the servers running Risen.JS should be directly accessible only by the computers implementing the server-side application using Risen.JS. The Express server port can be exposed as long as you have followed good security practices.

In the common case of a single computer directly exposed to the internet, such as a virtualized Linux instance, the Risen.JS port should be fire-walled to prevent access from the outside while the Express server can be exposed.

Clients will still be able to access Risen.JS using the loopback interface within the environment. Note that it is possible to bind Risen.JS to the address `0.0.0.0` by just specifying a `port` without the `host` option but this is not recommended as you are binding to all interfaces at the same time.

Failing to protect the Risen.JS port address from the outside can have a big security impact.

## Secure Code Practices

Risen.JS uses all the well-known practices for writing secure code, preventing buffer overflow, and other memory corruption issues. Risen.JS does not require root privileges to run as it's a typical Node.JS application.

It is recommended to run it as an unprivileged Risen.JS user that is only used for this purpose. It's also recommended to ensure your file/folder permissions do not allow this user to any resources which the Risen.JS service does not need. This will help ensure security is maintained.
