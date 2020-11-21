---
id: definerenderservice
title: Define the "render" service
sidebar_label: Render Service
---

Let's now define the second service called `render`. This service will have one operation called `renderPage` and will receive requests from your browser (routed through Express).

We are going to get the list of prime numbers from the service instances of `prime`. So here we want to split and dispatch the work between **four** `prime` service instances meaning we are calculating the full list in parallel!

The `prime` services will calculate the list of prime numbers and sent their responses back to the `render` service which will then combine all the results. After this, the service will generate the HTML server-side then send the response back to your browser.

## Create Folder

Create a new folder called `services/render` and cd into that folder:

```sh
mkdir -p services/render && cd services/render
```

## Create File

Create the file which will contain the service you are going to initialize in the framework later:

```sh
touch index.jsx
```

## Add Service Definitions

Paste the following code into the file you've just created. This is to make the React.JS server-side rendering work:

```jsx
import React from "react";
import PropTypes from "prop-types";
import { renderToString } from "react-dom/server";
import { Layout, Breadcrumb, Tag } from "antd";

const { Content, Footer } = Layout;

// The number of "prime" services we are going to split the work into.
const numberOfProcesses = 4;

// This will allow us to split the work into smaller batches
const getIntervals = (max, nInt) => {
  if (max <= nInt) {
    return [[0, max]];
  }
  const c = Math.floor(max / nInt);
  const r = [];
  for (let i = 0; i <= max; i += c) {
    const a = i === 0 ? i : (i += 1);
    const b = i + c > max ? max : i + c;
    if (a < max) r.push([a, b]);
  }
  return r;
};

const PrimeNumberApp = ({ prime, listOfPrimes }) => (
  <html lang="en">
    <head>
      <title>{`Prime Numbers Up To ${prime}`}</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.8.2/antd.min.css"
      />
    </head>
    <body>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Prime Number Finder</Breadcrumb.Item>
            <Breadcrumb.Item>
              Numbers Up To
              {` ${prime}`}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <div
              style={{
                background: "#fff",
                padding: 24,
                minHeight: "calc(100vh - 170px)",
              }}
            >
              {listOfPrimes.map((number) => (
                <Tag style={{ marginBottom: "8px" }} key={number}>
                  {number}
                </Tag>
              ))}
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {`This page was rendered on the server by an instance of the
            "${process.env.name}" service. Instance ID: ${process.env.instanceId}`}
        </Footer>
      </Layout>
    </body>
  </html>
);

PrimeNumberApp.propTypes = {
  prime: PropTypes.number.isRequired,
  listOfPrimes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default {
  renderPage: async ({ sendSuccess, data, request }) => {
    const prime = parseInt(data.body.prime, 10);
    const intervals = getIntervals(prime, numberOfProcesses);
    return Promise.all(
      intervals.map(([start, end]) => request({
        body: { start, end },
        destination: "prime",
        functionName: "getPrimeListFromRange",
      })),
    ).then((results) => {
      // Reduce the results from all the processes into one array
      const listOfPrimes = results.reduce(
        (primeList, result) => primeList.concat(result.response),
        [],
      );
      // Send back to the browser
      return sendSuccess({
        result: renderToString(<PrimeNumberApp listOfPrimes={listOfPrimes} prime={prime} />),
      });
    });
  },
};
```

> Notice how we are using ES6+ in this example. This is possible because Risen.JS supports runtime babel transpilation of service definition files before they are initialized. This means you don't have to mess around with doing this yourself before executing the framework.

## Back To Root

Back To Root:

```sh
cd ../..
```

## Summary

The folder structure should have so far should look like this:

```
├── package.json
├── services
│   ├── prime
│   │   └── index.js
│   └── render
│       └── index.jsx
└── yarn.lock
```

Now we have two services and are ready to initialize our Risen.JS application. Let's do some configuration next...
