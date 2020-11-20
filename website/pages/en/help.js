/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const { Container } = CompLibrary;
const { GridBlock } = CompLibrary;

function Help(props) {
  const { config: siteConfig, language = "" } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
  const langPart = `${language ? `${language}/` : ""}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more about Risen.JS by viewing the [documentation on this site.](${docUrl(
        "quickstart"
      )})`,
      title: "Browse Docs"
    },
    {
      content:
        "If you need help or are having trouble please create an issue by following this [link](https://github.com/daviemakz/risen-js/issues/new/choose).",
      title: "Create an issue"
    },
    {
      content:
        "If you want to have a look at the codebase please visit this [link](https://github.com/daviemakz/risen-js).",
      title: "Check out the code"
    }
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <img
            alt="Designed by vectorjuice / Freepik"
            src={`${baseUrl}img/help.jpg`}
            style={{
              width: "40%",
              margin: "0 auto",
              display: "block"
            }}
          />
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>
            Have you bumped into an issue? Cant get the framework to start? You
            think you&apos;ve bumped into a bug. Check out the sections below
            for more help.
          </p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
